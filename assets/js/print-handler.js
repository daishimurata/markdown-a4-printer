/**
 * Print Handler - A4 Print Optimization
 * Handles print-specific optimizations and page setup
 */
class PrintHandler {
  constructor() {
    this.setupPrintEvents();
    this.printSettings = {
      showPageNumbers: true,
      enableTableStripes: true,
      compactMode: false
    };
  }

  /**
   * Setup print event listeners
   */
  setupPrintEvents() {
    // Browser print events
    window.addEventListener('beforeprint', this.handleBeforePrint.bind(this));
    window.addEventListener('afterprint', this.handleAfterPrint.bind(this));

    // Custom print button events
    document.addEventListener('DOMContentLoaded', () => {
      this.bindPrintButton();
      this.bindPreviewButton();
    });
  }

  /**
   * Bind print button event
   */
  bindPrintButton() {
    const printBtn = document.getElementById('printBtn');
    if (printBtn) {
      printBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.triggerPrint();
      });
    }
  }

  /**
   * Bind preview button event
   */
  bindPreviewButton() {
    const previewBtn = document.getElementById('previewBtn');
    if (previewBtn) {
      previewBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.togglePrintPreview();
      });
    }
  }

  /**
   * Trigger print operation
   */
  triggerPrint() {
    try {
      // Validate content before printing
      if (!this.validatePrintContent()) {
        this.showError('No content to print. Please load a Markdown file first.');
        return;
      }

      // Apply pre-print optimizations
      this.optimizeForPrint();

      // Show loading state
      this.showPrintLoading();

      // Small delay to ensure styles are applied
      setTimeout(() => {
        window.print();
        this.hidePrintLoading();
      }, 100);

    } catch (error) {
      console.error('Print error:', error);
      this.showError('Failed to print document.');
      this.hidePrintLoading();
    }
  }

  /**
   * Handle before print event
   */
  handleBeforePrint() {
    console.log('Preparing document for print...');
    
    // Apply print optimizations
    this.optimizeForPrint();
    
    // Add page numbers if enabled
    if (this.printSettings.showPageNumbers) {
      this.addPageNumbers();
    }

    // Optimize tables for print
    this.optimizeTablesForPrint();

    // Apply compact mode if enabled
    if (this.printSettings.compactMode) {
      document.body.classList.add('compact-mode');
    }

    // Hide control panel
    this.hideControlsForPrint();

    // Ensure proper page breaks
    this.optimizePageBreaks();
  }

  /**
   * Handle after print event
   */
  handleAfterPrint() {
    console.log('Print completed, restoring view...');
    
    // Restore normal view
    this.restoreNormalView();
    
    // Remove print-specific classes
    document.body.classList.remove('compact-mode', 'print-mode');
    
    // Show controls again
    this.showControlsAfterPrint();
    
    // Remove temporary elements
    this.removeTemporaryElements();
  }

  /**
   * Optimize document for printing
   */
  optimizeForPrint() {
    // Add print mode class
    document.body.classList.add('print-mode');

    // Ensure document container takes full width
    const documentContainer = document.getElementById('documentContainer');
    if (documentContainer) {
      documentContainer.style.maxWidth = '100%';
      documentContainer.style.margin = '0';
      documentContainer.style.padding = '0';
    }

    // Optimize images for print
    this.optimizeImagesForPrint();

    // Ensure links are visible in print
    this.optimizeLinksForPrint();
  }

  /**
   * Optimize tables for print
   */
  optimizeTablesForPrint() {
    const tables = document.querySelectorAll('.table-wrapper table');
    
    tables.forEach((table, index) => {
      // Add print-specific class
      table.classList.add('print-table');
      
      // Ensure table doesn't break across pages
      const wrapper = table.closest('.table-wrapper');
      if (wrapper) {
        wrapper.style.pageBreakInside = 'avoid';
      }

      // Adjust table width for print
      const tableWidth = table.offsetWidth;
      const containerWidth = table.parentElement.offsetWidth;
      
      if (tableWidth > containerWidth) {
        // Scale down table font size for better fit
        table.style.fontSize = '8pt';
        
        // Adjust cell padding
        const cells = table.querySelectorAll('th, td');
        cells.forEach(cell => {
          cell.style.padding = '3pt 6pt';
        });
      }
    });
  }

  /**
   * Add page numbers
   */
  addPageNumbers() {
    // Page numbers are handled by CSS @page rule
    // This method can be used for additional page number formatting
    const footer = document.querySelector('.document-footer');
    if (footer) {
      footer.setAttribute('data-print-footer', 'true');
    }
  }

  /**
   * Optimize page breaks
   */
  optimizePageBreaks() {
    // Ensure headings don't break from following content
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(heading => {
      heading.style.pageBreakAfter = 'avoid';
      heading.style.pageBreakInside = 'avoid';
    });

    // Ensure code blocks don't break
    const codeBlocks = document.querySelectorAll('pre');
    codeBlocks.forEach(block => {
      block.style.pageBreakInside = 'avoid';
    });

    // Ensure blockquotes don't break
    const blockquotes = document.querySelectorAll('blockquote');
    blockquotes.forEach(quote => {
      quote.style.pageBreakInside = 'avoid';
    });

    // Ensure lists don't break inappropriately
    const lists = document.querySelectorAll('ul, ol');
    lists.forEach(list => {
      if (list.children.length <= 5) {
        list.style.pageBreakInside = 'avoid';
      }
    });
  }

  /**
   * Optimize images for print
   */
  optimizeImagesForPrint() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.style.maxWidth = '100%';
      img.style.height = 'auto';
      img.style.pageBreakInside = 'avoid';
    });
  }

  /**
   * Optimize links for print
   */
  optimizeLinksForPrint() {
    const links = document.querySelectorAll('a[href]');
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('http')) {
        // URL will be added via CSS :after pseudo-element
        link.setAttribute('data-print-url', href);
      }
    });
  }

  /**
   * Hide controls for print
   */
  hideControlsForPrint() {
    const controlPanel = document.getElementById('controlPanel');
    if (controlPanel) {
      controlPanel.style.display = 'none';
    }

    // Hide any error/success toasts
    const toasts = document.querySelectorAll('.error-toast, .success-toast');
    toasts.forEach(toast => {
      toast.style.display = 'none';
    });
  }

  /**
   * Show controls after print
   */
  showControlsAfterPrint() {
    const controlPanel = document.getElementById('controlPanel');
    if (controlPanel) {
      controlPanel.style.display = '';
    }

    // Restore toasts
    const toasts = document.querySelectorAll('.error-toast, .success-toast');
    toasts.forEach(toast => {
      toast.style.display = '';
    });
  }

  /**
   * Restore normal view
   */
  restoreNormalView() {
    // Remove print mode class
    document.body.classList.remove('print-mode');

    // Restore document container styles
    const documentContainer = document.getElementById('documentContainer');
    if (documentContainer) {
      documentContainer.style.maxWidth = '';
      documentContainer.style.margin = '';
      documentContainer.style.padding = '';
    }

    // Restore table styles
    const tables = document.querySelectorAll('.print-table');
    tables.forEach(table => {
      table.classList.remove('print-table');
      table.style.fontSize = '';
      
      const cells = table.querySelectorAll('th, td');
      cells.forEach(cell => {
        cell.style.padding = '';
      });
    });

    // Restore image styles
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.style.maxWidth = '';
      img.style.height = '';
      img.style.pageBreakInside = '';
    });
  }

  /**
   * Remove temporary elements
   */
  removeTemporaryElements() {
    // Remove any temporary print elements
    const tempElements = document.querySelectorAll('[data-print-temp]');
    tempElements.forEach(element => {
      element.remove();
    });
  }

  /**
   * Toggle print preview mode
   */
  togglePrintPreview() {
    const body = document.body;
    const isPreview = body.classList.contains('print-preview-mode');

    if (isPreview) {
      // Exit preview mode
      body.classList.remove('print-preview-mode');
      this.restoreNormalView();
      this.updatePreviewButton(false);
    } else {
      // Enter preview mode
      body.classList.add('print-preview-mode');
      this.optimizeForPrint();
      this.updatePreviewButton(true);
    }
  }

  /**
   * Update preview button state
   */
  updatePreviewButton(isPreview) {
    const previewBtn = document.getElementById('previewBtn');
    if (previewBtn) {
      const icon = previewBtn.querySelector('.btn-icon');
      const text = previewBtn.childNodes[2]; // Text node after icon
      
      if (isPreview) {
        if (icon) icon.textContent = '🔄';
        if (text) text.textContent = ' Normal View';
        previewBtn.classList.add('active');
      } else {
        if (icon) icon.textContent = '👁️';
        if (text) text.textContent = ' Preview';
        previewBtn.classList.remove('active');
      }
    }
  }

  /**
   * Validate print content
   */
  validatePrintContent() {
    const documentContent = document.getElementById('documentContent');
    if (!documentContent) return false;

    const welcomeMessage = documentContent.querySelector('.welcome-message');
    if (welcomeMessage && !welcomeMessage.classList.contains('hidden')) {
      return false; // Only welcome message is showing
    }

    const content = documentContent.textContent.trim();
    return content.length > 0;
  }

  /**
   * Show print loading state
   */
  showPrintLoading() {
    const printBtn = document.getElementById('printBtn');
    if (printBtn) {
      const originalText = printBtn.innerHTML;
      printBtn.setAttribute('data-original-content', originalText);
      printBtn.innerHTML = '<span class="btn-icon">⏳</span> Preparing...';
      printBtn.disabled = true;
    }
  }

  /**
   * Hide print loading state
   */
  hidePrintLoading() {
    const printBtn = document.getElementById('printBtn');
    if (printBtn) {
      const originalContent = printBtn.getAttribute('data-original-content');
      if (originalContent) {
        printBtn.innerHTML = originalContent;
        printBtn.removeAttribute('data-original-content');
      }
      printBtn.disabled = false;
    }
  }

  /**
   * Update print settings
   */
  updateSettings(settings) {
    this.printSettings = { ...this.printSettings, ...settings };
  }

  /**
   * Get current print settings
   */
  getSettings() {
    return { ...this.printSettings };
  }

  /**
   * Show error message
   */
  showError(message) {
    const errorToast = document.getElementById('errorToast');
    const errorMessage = document.getElementById('errorMessage');
    
    if (errorToast && errorMessage) {
      errorMessage.textContent = message;
      errorToast.classList.remove('hidden');
      
      // Auto hide after 5 seconds
      setTimeout(() => {
        errorToast.classList.add('hidden');
      }, 5000);
    }
  }

  /**
   * Export to HTML file
   */
  exportToHtml() {
    try {
      const documentContainer = document.getElementById('documentContainer');
      if (!documentContainer) {
        this.showError('No content to export.');
        return;
      }

      // Create a complete HTML document
      const htmlContent = this.createExportableHtml();
      
      // Create download link
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `markdown-export-${new Date().toISOString().split('T')[0]}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      URL.revokeObjectURL(url);
      
      this.showSuccess('HTML file exported successfully!');
    } catch (error) {
      console.error('Export error:', error);
      this.showError('Failed to export HTML file.');
    }
  }

  /**
   * Create exportable HTML
   */
  createExportableHtml() {
    const documentContent = document.getElementById('documentContent').innerHTML;
    const documentTitle = document.getElementById('documentTitle').textContent;
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${documentTitle}</title>
  <style>
    ${this.getExportStyles()}
  </style>
</head>
<body>
  <div class="document-container">
    <div class="document-content">
      ${documentContent}
    </div>
  </div>
</body>
</html>`;
  }

  /**
   * Get styles for export
   */
  getExportStyles() {
    // Include essential styles for the exported HTML
    return `
      body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        line-height: 1.6;
        color: #000;
        background: #fff;
        margin: 0;
        padding: 20px;
      }
      .document-container {
        max-width: 210mm;
        margin: 0 auto;
        background: white;
      }
      .document-content {
        padding: 20mm;
      }
      h1, h2, h3, h4, h5, h6 {
        color: #000;
        font-weight: 600;
        margin-top: 2em;
        margin-bottom: 1em;
      }
      h1 { font-size: 2.5em; border-bottom: 2px solid #ccc; padding-bottom: 0.3em; }
      h2 { font-size: 2em; border-bottom: 1px solid #ccc; padding-bottom: 0.3em; }
      p { margin-bottom: 1em; }
      table { width: 100%; border-collapse: collapse; margin: 1em 0; }
      th, td { padding: 8px 12px; border: 1px solid #ccc; text-align: left; }
      th { background: #f5f5f5; font-weight: 600; }
      tr:nth-child(even) { background: #fafafa; }
      code { background: #f0f0f0; padding: 2px 4px; border-radius: 3px; }
      pre { background: #f0f0f0; padding: 1em; border-radius: 5px; overflow-x: auto; }
      blockquote { border-left: 4px solid #999; padding-left: 1em; margin: 1em 0; }
      ul, ol { margin: 1em 0; padding-left: 2em; }
      @media print {
        @page { size: A4; margin: 20mm; }
        body { font-size: 10pt; }
        h1 { font-size: 16pt; } h2 { font-size: 14pt; }
      }
    `;
  }

  /**
   * Show success message
   */
  showSuccess(message) {
    const successToast = document.getElementById('successToast');
    const successMessage = document.getElementById('successMessage');
    
    if (successToast && successMessage) {
      successMessage.textContent = message;
      successToast.classList.remove('hidden');
      
      // Auto hide after 3 seconds
      setTimeout(() => {
        successToast.classList.add('hidden');
      }, 3000);
    }
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PrintHandler;
} 