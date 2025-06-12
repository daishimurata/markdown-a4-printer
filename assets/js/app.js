/**
 * Markdown A4 Printer - Main Application
 * Handles file loading, UI interactions, and application state
 */
class MarkdownA4Printer {
  constructor() {
    this.markdownParser = new MarkdownParser();
    this.printHandler = new PrintHandler();
    this.currentFile = null;
    this.settings = {
      template: 'business',
      showPageNumbers: true,
      enableTableStripes: true,
      compactMode: false
    };
    
    this.init();
  }

  /**
   * Initialize the application
   */
  init() {
    this.hideLoadingScreen();
    this.bindEvents();
    this.loadSettings();
    this.setCurrentDate();
    this.updateUI();
  }

  /**
   * Hide loading screen
   */
  hideLoadingScreen() {
    setTimeout(() => {
      const loadingScreen = document.getElementById('loading-screen');
      if (loadingScreen) {
        loadingScreen.classList.add('hidden');
      }
    }, 1000);
  }

  /**
   * Bind all event listeners
   */
  bindEvents() {
    this.bindFileInput();
    this.bindDragAndDrop();
    this.bindControlButtons();
    this.bindSettings();
    this.bindTemplateSelection();
    this.bindToastCloseButtons();
    this.bindKeyboardShortcuts();
  }

  /**
   * Bind file input events
   */
  bindFileInput() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.addEventListener('change', this.handleFileSelect.bind(this));
    }
  }

  /**
   * Bind drag and drop events
   */
  bindDragAndDrop() {
    const dropZone = document.getElementById('fileDropZone');
    const documentContainer = document.getElementById('documentContainer');
    
    if (dropZone) {
      dropZone.addEventListener('dragover', this.handleDragOver.bind(this));
      dropZone.addEventListener('dragleave', this.handleDragLeave.bind(this));
      dropZone.addEventListener('drop', this.handleDrop.bind(this));
    }

    if (documentContainer) {
      documentContainer.addEventListener('dragover', this.handleDragOver.bind(this));
      documentContainer.addEventListener('drop', this.handleDrop.bind(this));
    }

    // Prevent default drag behaviors on document
    document.addEventListener('dragover', (e) => e.preventDefault());
    document.addEventListener('drop', (e) => e.preventDefault());
  }

  /**
   * Bind control button events
   */
  bindControlButtons() {
    // Print button - handled by PrintHandler
    
    // Preview button - handled by PrintHandler
    
    // Download button
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', () => {
        this.printHandler.exportToHtml();
      });
    }

    // Settings toggle
    const settingsToggle = document.getElementById('settingsToggle');
    if (settingsToggle) {
      settingsToggle.addEventListener('click', this.toggleSettings.bind(this));
    }

    // Document clicks to close settings
    document.addEventListener('click', (e) => {
      const settingsPanel = document.getElementById('settingsPanel');
      const settingsToggle = document.getElementById('settingsToggle');
      
      if (settingsPanel && !settingsPanel.contains(e.target) && 
          !settingsToggle.contains(e.target)) {
        settingsPanel.classList.add('hidden');
      }
    });
  }

  /**
   * Bind settings events
   */
  bindSettings() {
    const settingsInputs = [
      'showPageNumbers',
      'enableTableStripes',
      'compactMode'
    ];

    settingsInputs.forEach(id => {
      const input = document.getElementById(id);
      if (input) {
        input.addEventListener('change', this.handleSettingChange.bind(this));
      }
    });
  }

  /**
   * Bind template selection
   */
  bindTemplateSelection() {
    const templateSelect = document.getElementById('templateSelect');
    if (templateSelect) {
      templateSelect.addEventListener('change', this.handleTemplateChange.bind(this));
    }
  }

  /**
   * Bind toast close buttons
   */
  bindToastCloseButtons() {
    const closeError = document.getElementById('closeError');
    const closeSuccess = document.getElementById('closeSuccess');

    if (closeError) {
      closeError.addEventListener('click', () => {
        document.getElementById('errorToast').classList.add('hidden');
      });
    }

    if (closeSuccess) {
      closeSuccess.addEventListener('click', () => {
        document.getElementById('successToast').classList.add('hidden');
      });
    }
  }

  /**
   * Bind keyboard shortcuts
   */
  bindKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + P for print
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        if (this.printHandler) {
          this.printHandler.triggerPrint();
        }
      }

      // Ctrl/Cmd + O for open file
      if ((e.ctrlKey || e.metaKey) && e.key === 'o') {
        e.preventDefault();
        document.getElementById('fileInput').click();
      }

      // Ctrl/Cmd + S for save/download
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        this.printHandler.exportToHtml();
      }

      // Escape to close settings
      if (e.key === 'Escape') {
        const settingsPanel = document.getElementById('settingsPanel');
        if (settingsPanel && !settingsPanel.classList.contains('hidden')) {
          settingsPanel.classList.add('hidden');
        }
      }
    });
  }

  /**
   * Handle file selection
   */
  handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
      this.loadFile(file);
    }
  }

  /**
   * Handle drag over
   */
  handleDragOver(event) {
    event.preventDefault();
    event.currentTarget.classList.add('drag-over');
  }

  /**
   * Handle drag leave
   */
  handleDragLeave(event) {
    event.preventDefault();
    event.currentTarget.classList.remove('drag-over');
  }

  /**
   * Handle file drop
   */
  handleDrop(event) {
    event.preventDefault();
    event.currentTarget.classList.remove('drag-over');
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (this.isMarkdownFile(file)) {
        this.loadFile(file);
      } else {
        this.showError('Please drop a Markdown file (.md, .markdown, or .txt)');
      }
    }
  }

  /**
   * Check if file is a markdown file
   */
  isMarkdownFile(file) {
    const validExtensions = ['.md', '.markdown', '.txt'];
    const fileName = file.name.toLowerCase();
    return validExtensions.some(ext => fileName.endsWith(ext)) || 
           file.type === 'text/markdown' || 
           file.type === 'text/plain';
  }

  /**
   * Load and process markdown file
   */
  async loadFile(file) {
    try {
      this.showLoadingState();
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('File is too large. Maximum size is 5MB.');
      }

      const text = await this.readFileAsText(file);
      const html = this.markdownParser.convert(text);
      
      this.renderDocument(html, file);
      this.updateFileInfo(file);
      this.showSuccess(`Successfully loaded "${file.name}"`);
      
    } catch (error) {
      console.error('File loading error:', error);
      this.showError(`Failed to load file: ${error.message}`);
    } finally {
      this.hideLoadingState();
    }
  }

  /**
   * Read file as text
   */
  readFileAsText(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  }

  /**
   * Render document in the container
   */
  renderDocument(html, file = null) {
    const documentContent = document.getElementById('documentContent');
    const documentTitle = document.getElementById('documentTitle');
    const welcomeMessage = document.querySelector('.welcome-message');
    
    if (documentContent && html.trim()) {
      // Hide welcome message
      if (welcomeMessage) {
        welcomeMessage.style.display = 'none';
      }
      
      // Set content
      documentContent.innerHTML = html;
      
      // Update title
      if (documentTitle && file) {
        const title = this.extractTitle(html) || file.name.replace(/\.[^/.]+$/, '');
        documentTitle.textContent = title;
      }
      
      // Apply current template
      this.applyTemplate(this.settings.template);
      
      // Add fade-in animation
      documentContent.classList.add('fade-in');
      
      // Update generation time
      this.updateGenerationTime();
      
      // Enable print button
      this.enablePrintButton();
      
    } else {
      this.showError('No content found in the file or conversion failed.');
    }
  }

  /**
   * Extract title from HTML
   */
  extractTitle(html) {
    const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
    if (h1Match) {
      return h1Match[1].replace(/<[^>]*>/g, '').trim();
    }
    return null;
  }

  /**
   * Update file information display
   */
  updateFileInfo(file) {
    const fileInfo = document.getElementById('fileInfo');
    const fileName = document.getElementById('fileName');
    const fileSize = document.getElementById('fileSize');
    const fileModified = document.getElementById('fileModified');
    
    if (fileInfo && fileName && fileSize && fileModified) {
      fileName.textContent = file.name;
      fileSize.textContent = this.formatFileSize(file.size);
      fileModified.textContent = new Date(file.lastModified).toLocaleDateString();
      fileInfo.classList.remove('hidden');
    }
    
    this.currentFile = file;
  }

  /**
   * Format file size
   */
  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Apply template styling
   */
  applyTemplate(templateName) {
    const documentContainer = document.getElementById('documentContainer');
    if (documentContainer) {
      // Remove existing template classes
      documentContainer.classList.remove('template-business', 'template-academic', 'template-report', 'template-modern');
      
      // Add new template class
      documentContainer.classList.add(`template-${templateName}`);
    }
  }

  /**
   * Handle template change
   */
  handleTemplateChange(event) {
    const newTemplate = event.target.value;
    this.settings.template = newTemplate;
    this.applyTemplate(newTemplate);
    this.saveSettings();
  }

  /**
   * Handle setting change
   */
  handleSettingChange(event) {
    const setting = event.target.id;
    const value = event.target.checked;
    
    this.settings[setting] = value;
    this.applySettings();
    this.saveSettings();
  }

  /**
   * Apply current settings
   */
  applySettings() {
    const documentContainer = document.getElementById('documentContainer');
    
    if (documentContainer) {
      // Apply compact mode
      documentContainer.classList.toggle('compact-mode', this.settings.compactMode);
      
      // Apply table stripes
      documentContainer.classList.toggle('no-table-stripes', !this.settings.enableTableStripes);
    }
    
    // Update print handler settings
    this.printHandler.updateSettings(this.settings);
  }

  /**
   * Toggle settings panel
   */
  toggleSettings() {
    const settingsPanel = document.getElementById('settingsPanel');
    if (settingsPanel) {
      settingsPanel.classList.toggle('hidden');
    }
  }

  /**
   * Load settings from localStorage
   */
  loadSettings() {
    try {
      const saved = localStorage.getItem('markdown-a4-printer-settings');
      if (saved) {
        this.settings = { ...this.settings, ...JSON.parse(saved) };
        this.updateSettingsUI();
        this.applySettings();
      }
    } catch (error) {
      console.warn('Failed to load settings:', error);
    }
  }

  /**
   * Save settings to localStorage
   */
  saveSettings() {
    try {
      localStorage.setItem('markdown-a4-printer-settings', JSON.stringify(this.settings));
    } catch (error) {
      console.warn('Failed to save settings:', error);
    }
  }

  /**
   * Update settings UI
   */
  updateSettingsUI() {
    // Update checkboxes
    Object.keys(this.settings).forEach(key => {
      const input = document.getElementById(key);
      if (input && input.type === 'checkbox') {
        input.checked = this.settings[key];
      }
    });
    
    // Update template select
    const templateSelect = document.getElementById('templateSelect');
    if (templateSelect) {
      templateSelect.value = this.settings.template;
    }
  }

  /**
   * Set current date
   */
  setCurrentDate() {
    const documentDate = document.getElementById('documentDate');
    if (documentDate) {
      documentDate.textContent = new Date().toLocaleDateString();
    }
  }

  /**
   * Update generation time
   */
  updateGenerationTime() {
    const generationTime = document.getElementById('generationTime');
    if (generationTime) {
      generationTime.textContent = new Date().toLocaleTimeString();
    }
  }

  /**
   * Update UI state
   */
  updateUI() {
    this.updateSettingsUI();
    this.applySettings();
  }

  /**
   * Enable print button
   */
  enablePrintButton() {
    const printBtn = document.getElementById('printBtn');
    const previewBtn = document.getElementById('previewBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    
    if (printBtn) printBtn.disabled = false;
    if (previewBtn) previewBtn.disabled = false;
    if (downloadBtn) downloadBtn.disabled = false;
  }

  /**
   * Show loading state
   */
  showLoadingState() {
    const fileInputLabel = document.querySelector('.file-input-label');
    if (fileInputLabel) {
      fileInputLabel.style.opacity = '0.6';
      fileInputLabel.style.pointerEvents = 'none';
    }
  }

  /**
   * Hide loading state
   */
  hideLoadingState() {
    const fileInputLabel = document.querySelector('.file-input-label');
    if (fileInputLabel) {
      fileInputLabel.style.opacity = '';
      fileInputLabel.style.pointerEvents = '';
    }
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
      
      setTimeout(() => {
        errorToast.classList.add('hidden');
      }, 5000);
    }
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
      
      setTimeout(() => {
        successToast.classList.add('hidden');
      }, 3000);
    }
  }

  /**
   * Reset application state
   */
  reset() {
    this.markdownParser.reset();
    this.currentFile = null;
    
    // Reset UI
    const documentContent = document.getElementById('documentContent');
    const welcomeMessage = document.querySelector('.welcome-message');
    const fileInfo = document.getElementById('fileInfo');
    
    if (documentContent && welcomeMessage) {
      documentContent.innerHTML = '';
      welcomeMessage.style.display = '';
    }
    
    if (fileInfo) {
      fileInfo.classList.add('hidden');
    }
    
    // Disable buttons
    const printBtn = document.getElementById('printBtn');
    const previewBtn = document.getElementById('previewBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    
    if (printBtn) printBtn.disabled = true;
    if (previewBtn) previewBtn.disabled = true;
    if (downloadBtn) downloadBtn.disabled = true;
  }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.markdownApp = new MarkdownA4Printer();
}); 