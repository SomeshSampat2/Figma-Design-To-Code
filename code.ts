// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

// Show the plugin UI
figma.showUI(__html__, { width: 400, height: 600, themeColors: true });

// Handle messages from the UI
figma.ui.onmessage = async (msg) => {
  if (msg.type === 'get-selection') {
    await handleGetSelection();
  } else if (msg.type === 'generate-code') {
    await handleGenerateCode(msg.format);
  } else if (msg.type === 'cancel') {
    figma.closePlugin();
  }
};

// Function to handle getting the current selection
async function handleGetSelection() {
  const selection = figma.currentPage.selection;
  
  if (selection.length === 0) {
    figma.ui.postMessage({
      type: 'selection-error',
      message: 'Please select a component or frame to convert.'
    });
    return;
  }

  if (selection.length > 1) {
    figma.ui.postMessage({
      type: 'selection-error',
      message: 'Please select only one component at a time.'
    });
    return;
  }

  try {
    const selectedNode = selection[0];
    const nodeData = await extractNodeData(selectedNode);
    
    figma.ui.postMessage({
      type: 'selection-success',
      nodeData: nodeData
    });
  } catch (error) {
    figma.ui.postMessage({
      type: 'selection-error',
      message: `Error extracting node data: ${error instanceof Error ? error.message : 'Unknown error'}`
    });
  }
}

// Enhanced function to extract comprehensive data from nodes
async function extractNodeData(node: SceneNode): Promise<any> {
  const baseData: any = {
    id: node.id,
    name: node.name,
    type: node.type,
    visible: node.visible,
  };

  // Add position and dimensions for nodes that support them
  if ('x' in node) baseData.x = node.x;
  if ('y' in node) baseData.y = node.y;
  if ('width' in node) baseData.width = node.width;
  if ('height' in node) baseData.height = node.height;
  if ('rotation' in node) baseData.rotation = node.rotation;

  // Extract layout and auto-layout properties
  if ('layoutMode' in node) {
    baseData.layout = {
      mode: node.layoutMode,
      wrap: 'layoutWrap' in node ? node.layoutWrap : null,
      align: 'primaryAxisAlignItems' in node ? node.primaryAxisAlignItems : null,
      justify: 'counterAxisAlignItems' in node ? node.counterAxisAlignItems : null,
      spacing: 'itemSpacing' in node ? node.itemSpacing : null,
      padding: {
        top: 'paddingTop' in node ? node.paddingTop : 0,
        right: 'paddingRight' in node ? node.paddingRight : 0,
        bottom: 'paddingBottom' in node ? node.paddingBottom : 0,
        left: 'paddingLeft' in node ? node.paddingLeft : 0,
      }
    };
  }

  // Extract constraints and positioning
  if ('constraints' in node) {
    baseData.constraints = {
      horizontal: node.constraints.horizontal,
      vertical: node.constraints.vertical
    };
  }

  // Extract fills with detailed information
  if ('fills' in node && node.fills && Array.isArray(node.fills)) {
    baseData.fills = node.fills.map(fill => {
      if (fill.type === 'SOLID') {
        return {
          type: fill.type,
          color: fill.color,
          opacity: fill.opacity || 1
        };
      } else if (fill.type === 'GRADIENT_LINEAR' || fill.type === 'GRADIENT_RADIAL') {
        return {
          type: fill.type,
          gradientStops: fill.gradientStops,
          gradientTransform: fill.gradientTransform
        };
      }
      return fill;
    });
  }

  // Extract strokes with detailed information
  if ('strokes' in node && node.strokes && Array.isArray(node.strokes)) {
    baseData.strokes = node.strokes.map(stroke => ({
      type: stroke.type,
      color: stroke.type === 'SOLID' ? stroke.color : null,
      opacity: stroke.opacity || 1
    }));
    if ('strokeWeight' in node) baseData.strokeWeight = node.strokeWeight;
    if ('strokeAlign' in node) baseData.strokeAlign = node.strokeAlign;
  }

  // Extract corner radius and border radius
  if ('cornerRadius' in node) {
    baseData.cornerRadius = node.cornerRadius;
  }
  if ('topLeftRadius' in node) {
    baseData.borderRadius = {
      topLeft: node.topLeftRadius,
      topRight: node.topRightRadius,
      bottomRight: node.bottomRightRadius,
      bottomLeft: node.bottomLeftRadius
    };
  }

  // Extract opacity and blend mode
  if ('opacity' in node) baseData.opacity = node.opacity;
  if ('blendMode' in node) baseData.blendMode = node.blendMode;

  // Extract effects (shadows, blurs, etc.)
  if ('effects' in node && node.effects && Array.isArray(node.effects)) {
    baseData.effects = node.effects.filter(effect => effect.visible).map(effect => ({
      type: effect.type,
      color: effect.color,
      offset: effect.offset,
      radius: effect.radius,
      spread: effect.spread
    }));
  }

  // Extract text-specific properties with comprehensive details
  if (node.type === 'TEXT') {
    const textNode = node as TextNode;
    baseData.text = {
      characters: textNode.characters,
      fontSize: textNode.fontSize,
      fontName: textNode.fontName,
      textCase: textNode.textCase,
      textDecoration: textNode.textDecoration,
      letterSpacing: textNode.letterSpacing,
      lineHeight: textNode.lineHeight,
      textAlignHorizontal: textNode.textAlignHorizontal,
      textAlignVertical: textNode.textAlignVertical,
      textAutoResize: textNode.textAutoResize,
      paragraphIndent: textNode.paragraphIndent,
      paragraphSpacing: textNode.paragraphSpacing,
      listSpacing: textNode.listSpacing,
      hangingPunctuation: textNode.hangingPunctuation,
      hangingList: textNode.hangingList
    };

    // Extract text styles for each character range if mixed formatting
    if (textNode.getStyledTextSegments) {
      try {
        const segments = textNode.getStyledTextSegments(['fontSize', 'fontName', 'fontWeight', 'fills']);
        baseData.text.segments = segments.map(segment => ({
          characters: segment.characters,
          start: segment.start,
          end: segment.end,
          fontSize: segment.fontSize,
          fontName: segment.fontName,
          fontWeight: segment.fontWeight,
          fills: segment.fills
        }));
      } catch (e) {
        // Fallback if styled segments aren't available
        console.log('Could not extract styled text segments');
      }
    }
  }

  // Extract image-specific properties
  if (node.type === 'RECTANGLE' || node.type === 'ELLIPSE' || node.type === 'POLYGON') {
    if ('fills' in node && node.fills && Array.isArray(node.fills)) {
      const imageFills = node.fills.filter(fill => fill.type === 'IMAGE');
      if (imageFills.length > 0) {
        baseData.images = imageFills.map(fill => ({
          scaleMode: fill.scaleMode,
          imageTransform: fill.imageTransform
        }));
      }
    }
  }

  // Extract component and instance properties
  if (node.type === 'COMPONENT') {
    const componentNode = node as ComponentNode;
    baseData.component = {
      key: componentNode.key,
      description: componentNode.description
    };
  }

  if (node.type === 'INSTANCE') {
    const instanceNode = node as InstanceNode;
    try {
      const mainComponent = await instanceNode.getMainComponentAsync();
      baseData.instance = {
        mainComponent: mainComponent ? {
          key: mainComponent.key,
          name: mainComponent.name
        } : null
      };
    } catch (error) {
      console.log('Could not get main component:', error);
      baseData.instance = {
        mainComponent: null
      };
    }
  }

  // Extract frame-specific properties
  if (node.type === 'FRAME' || node.type === 'GROUP') {
    baseData.frame = {
      clipsContent: 'clipsContent' in node ? node.clipsContent : false,
      layoutGrids: 'layoutGrids' in node ? node.layoutGrids : []
    };
  }

  // Recursively extract children data for container nodes
  if ('children' in node && node.children && node.children.length > 0) {
    baseData.children = await Promise.all(
      node.children.map(child => extractNodeData(child))
    );
    baseData.childrenCount = node.children.length;
  }

  return baseData;
}

// Enhanced function to handle code generation
async function handleGenerateCode(format: string) {
  try {
    const selection = figma.currentPage.selection;
    if (selection.length === 0) {
      figma.ui.postMessage({
        type: 'generation-error',
        message: 'No component selected.'
      });
      return;
    }

    const selectedNode = selection[0];
    
    // Load fonts if we're working with text nodes
    await loadRequiredFonts(selectedNode);
    
    const nodeData = await extractNodeData(selectedNode);
    
    // Send the comprehensive node data to the UI for processing
    figma.ui.postMessage({
      type: 'process-generation',
      nodeData: nodeData,
      format: format
    });

  } catch (error) {
    figma.ui.postMessage({
      type: 'generation-error',
      message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
    });
  }
}

// Helper function to load required fonts
async function loadRequiredFonts(node: SceneNode) {
  const fonts = new Set<{family: string, style: string}>();
  
  function collectFonts(node: SceneNode) {
    if (node.type === 'TEXT') {
      const textNode = node as TextNode;
      if (typeof textNode.fontName === 'object' && textNode.fontName.family) {
        fonts.add({
          family: textNode.fontName.family,
          style: textNode.fontName.style
        });
      }
    }
    
    if ('children' in node && node.children) {
      node.children.forEach(child => collectFonts(child));
    }
  }
  
  collectFonts(node);
  
  // Load all required fonts
  for (const font of fonts) {
    try {
      await figma.loadFontAsync(font);
    } catch (error) {
      console.log(`Could not load font: ${font.family} ${font.style}`);
    }
  }
}

// Handle selection changes
figma.on('selectionchange', () => {
  figma.ui.postMessage({
    type: 'selection-changed',
    hasSelection: figma.currentPage.selection.length > 0
  });
});
