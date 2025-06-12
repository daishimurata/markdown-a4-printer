/**
 * Markdown Parser - A4 Print Optimized
 * Converts Markdown to beautiful HTML with A4 print support
 */
class MarkdownParser {
  constructor() {
    this.codeBlocks = [];
    this.inlineCodes = [];
    this.tableCount = 0;
    this.linkIndex = 1;
    this.footnotes = [];
  }

  /**
   * Main conversion method
   * @param {string} markdown - Raw markdown text
   * @returns {string} - Converted HTML
   */
  convert(markdown) {
    if (!markdown || typeof markdown !== 'string') {
      return '';
    }

    let html = markdown;

    try {
      // 1. Preserve code blocks and inline code
      html = this.preserveCodeBlocks(html);
      html = this.preserveInlineCode(html);

      // 2. Convert block elements first
      html = this.convertTables(html);
      html = this.convertHeadings(html);
      html = this.convertBlockquotes(html);
      html = this.convertHorizontalRules(html);

      // 3. Convert list elements
      html = this.convertUnorderedLists(html);
      html = this.convertOrderedLists(html);

      // 4. Convert inline elements
      html = this.convertLinks(html);
      html = this.convertImages(html);
      html = this.convertEmphasis(html);
      html = this.convertStrikethrough(html);

      // 5. Convert paragraphs (must be after other conversions)
      html = this.convertParagraphs(html);

      // 6. Restore preserved code
      html = this.restoreInlineCode(html);
      html = this.restoreCodeBlocks(html);

      // 7. Clean up
      html = this.cleanupHtml(html);

      return html;
    } catch (error) {
      console.error('Markdown conversion error:', error);
      return `<p>Error converting markdown: ${error.message}</p>`;
    }
  }

  /**
   * Preserve code blocks to prevent interference with other conversions
   */
  preserveCodeBlocks(html) {
    const codeBlockRegex = /```(\w+)?\n?([\s\S]*?)```/g;
    return html.replace(codeBlockRegex, (match, language, code) => {
      const index = this.codeBlocks.length;
      const placeholder = `__CODE_BLOCK_${index}__`;
      this.codeBlocks.push({
        language: language || '',
        code: code.trim(),
        placeholder
      });
      return placeholder;
    });
  }

  /**
   * Restore code blocks
   */
  restoreCodeBlocks(html) {
    this.codeBlocks.forEach((block, index) => {
      const placeholder = `__CODE_BLOCK_${index}__`;
      const languageClass = block.language ? ` class="language-${block.language}"` : '';
      const escapedCode = this.escapeHtml(block.code);
      const codeHtml = `<pre${languageClass}><code>${escapedCode}</code></pre>`;
      html = html.replace(placeholder, codeHtml);
    });
    return html;
  }

  /**
   * Preserve inline code
   */
  preserveInlineCode(html) {
    const inlineCodeRegex = /`([^`]+)`/g;
    return html.replace(inlineCodeRegex, (match, code) => {
      const index = this.inlineCodes.length;
      const placeholder = `__INLINE_CODE_${index}__`;
      this.inlineCodes.push({
        code: code,
        placeholder
      });
      return placeholder;
    });
  }

  /**
   * Restore inline code
   */
  restoreInlineCode(html) {
    this.inlineCodes.forEach((block, index) => {
      const placeholder = `__INLINE_CODE_${index}__`;
      const escapedCode = this.escapeHtml(block.code);
      const codeHtml = `<code>${escapedCode}</code>`;
      html = html.replace(placeholder, codeHtml);
    });
    return html;
  }

  /**
   * Convert headings
   */
  convertHeadings(html) {
    // ATX headings (# ## ### etc.)
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    return html.replace(headingRegex, (match, hashes, text) => {
      const level = hashes.length;
      const id = this.generateId(text);
      return `<h${level} id="${id}">${text.trim()}</h${level}>`;
    });
  }

  /**
   * Generate ID for headings
   */
  generateId(text) {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  /**
   * Convert tables
   */
  convertTables(html) {
    const tableRegex = /^\|(.+)\|\s*\n\|([|\-\s:]+)\|\s*\n((?:\|.+\|\s*\n?)*)/gm;
    
    return html.replace(tableRegex, (match, header, separator, rows) => {
      this.tableCount++;
      
      try {
        // Parse header
        const headerCells = this.parseTableRow(header);
        const alignments = this.parseTableAlignment(separator);
        
        // Parse rows
        const bodyRows = rows.trim().split('\n')
          .filter(row => row.trim())
          .map(row => this.parseTableRow(row));

        return this.buildTable(headerCells, bodyRows, alignments);
      } catch (error) {
        console.warn('Table parsing error:', error);
        return match; // Return original if parsing fails
      }
    });
  }

  /**
   * Parse table row
   */
  parseTableRow(row) {
    return row.split('|')
      .slice(1, -1) // Remove first and last empty elements
      .map(cell => cell.trim());
  }

  /**
   * Parse table alignment
   */
  parseTableAlignment(separator) {
    return separator.split('|')
      .slice(1, -1)
      .map(cell => {
        const trimmed = cell.trim();
        if (trimmed.startsWith(':') && trimmed.endsWith(':')) return 'center';
        if (trimmed.endsWith(':')) return 'right';
        return 'left';
      });
  }

  /**
   * Build table HTML
   */
  buildTable(headerCells, bodyRows, alignments) {
    let tableHtml = '<div class="table-wrapper">\n<table>\n';
    
    // Table header
    tableHtml += '<thead>\n<tr>\n';
    headerCells.forEach((cell, index) => {
      const align = alignments[index] || 'left';
      const style = align !== 'left' ? ` style="text-align: ${align}"` : '';
      tableHtml += `<th${style}>${this.convertInlineElements(cell)}</th>\n`;
    });
    tableHtml += '</tr>\n</thead>\n';

    // Table body
    tableHtml += '<tbody>\n';
    bodyRows.forEach(row => {
      tableHtml += '<tr>\n';
      row.forEach((cell, index) => {
        const align = alignments[index] || 'left';
        const style = align !== 'left' ? ` style="text-align: ${align}"` : '';
        tableHtml += `<td${style}>${this.convertInlineElements(cell)}</td>\n`;
      });
      tableHtml += '</tr>\n';
    });
    tableHtml += '</tbody>\n';

    tableHtml += '</table>\n</div>';
    return tableHtml;
  }

  /**
   * Convert inline elements for table cells
   */
  convertInlineElements(text) {
    // Basic inline conversions for table cells
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/~~(.*?)~~/g, '<del>$1</del>');
  }

  /**
   * Convert unordered lists
   */
  convertUnorderedLists(html) {
    const lines = html.split('\n');
    const result = [];
    let inList = false;
    let listLevel = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const listMatch = line.match(/^(\s*)([-*+])\s+(.+)$/);

      if (listMatch) {
        const [, indent, bullet, content] = listMatch;
        const currentLevel = Math.floor(indent.length / 2);

        if (!inList) {
          result.push('<ul>');
          inList = true;
          listLevel = currentLevel;
        } else if (currentLevel > listLevel) {
          result.push('<ul>');
          listLevel = currentLevel;
        } else if (currentLevel < listLevel) {
          for (let j = listLevel; j > currentLevel; j--) {
            result.push('</ul>');
          }
          listLevel = currentLevel;
        }

        result.push(`<li>${content}</li>`);
      } else {
        if (inList) {
          for (let j = listLevel; j >= 0; j--) {
            result.push('</ul>');
          }
          inList = false;
          listLevel = 0;
        }
        result.push(line);
      }
    }

    // Close any remaining lists
    if (inList) {
      for (let j = listLevel; j >= 0; j--) {
        result.push('</ul>');
      }
    }

    return result.join('\n');
  }

  /**
   * Convert ordered lists
   */
  convertOrderedLists(html) {
    const lines = html.split('\n');
    const result = [];
    let inList = false;
    let listLevel = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const listMatch = line.match(/^(\s*)(\d+)\.\s+(.+)$/);

      if (listMatch) {
        const [, indent, number, content] = listMatch;
        const currentLevel = Math.floor(indent.length / 2);

        if (!inList) {
          result.push('<ol>');
          inList = true;
          listLevel = currentLevel;
        } else if (currentLevel > listLevel) {
          result.push('<ol>');
          listLevel = currentLevel;
        } else if (currentLevel < listLevel) {
          for (let j = listLevel; j > currentLevel; j--) {
            result.push('</ol>');
          }
          listLevel = currentLevel;
        }

        result.push(`<li>${content}</li>`);
      } else {
        if (inList) {
          for (let j = listLevel; j >= 0; j--) {
            result.push('</ol>');
          }
          inList = false;
          listLevel = 0;
        }
        result.push(line);
      }
    }

    // Close any remaining lists
    if (inList) {
      for (let j = listLevel; j >= 0; j--) {
        result.push('</ol>');
      }
    }

    return result.join('\n');
  }

  /**
   * Convert blockquotes
   */
  convertBlockquotes(html) {
    const lines = html.split('\n');
    const result = [];
    let inBlockquote = false;

    for (const line of lines) {
      if (line.startsWith('> ')) {
        if (!inBlockquote) {
          result.push('<blockquote>');
          inBlockquote = true;
        }
        result.push(line.substring(2));
      } else {
        if (inBlockquote) {
          result.push('</blockquote>');
          inBlockquote = false;
        }
        result.push(line);
      }
    }

    if (inBlockquote) {
      result.push('</blockquote>');
    }

    return result.join('\n');
  }

  /**
   * Convert horizontal rules
   */
  convertHorizontalRules(html) {
    return html.replace(/^(---|___|\*\*\*)$/gm, '<hr>');
  }

  /**
   * Convert links
   */
  convertLinks(html) {
    // [text](url "title") format
    const linkRegex = /\[([^\]]+)\]\(([^)]+)(?:\s+"([^"]*)")?\)/g;
    return html.replace(linkRegex, (match, text, url, title) => {
      const titleAttr = title ? ` title="${this.escapeHtml(title)}"` : '';
      const target = url.startsWith('http') ? ' target="_blank" rel="noopener"' : '';
      return `<a href="${this.escapeHtml(url)}"${titleAttr}${target}>${text}</a>`;
    });
  }

  /**
   * Convert images
   */
  convertImages(html) {
    // ![alt](src "title") format
    const imageRegex = /!\[([^\]]*)\]\(([^)]+)(?:\s+"([^"]*)")?\)/g;
    return html.replace(imageRegex, (match, alt, src, title) => {
      const altAttr = alt ? ` alt="${this.escapeHtml(alt)}"` : ' alt=""';
      const titleAttr = title ? ` title="${this.escapeHtml(title)}"` : '';
      return `<img src="${this.escapeHtml(src)}"${altAttr}${titleAttr}>`;
    });
  }

  /**
   * Convert emphasis (bold and italic)
   */
  convertEmphasis(html) {
    // Bold: **text** or __text__
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');
    
    // Italic: *text* or _text_
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/_(.*?)_/g, '<em>$1</em>');
    
    return html;
  }

  /**
   * Convert strikethrough
   */
  convertStrikethrough(html) {
    return html.replace(/~~(.*?)~~/g, '<del>$1</del>');
  }

  /**
   * Convert paragraphs
   */
  convertParagraphs(html) {
    const lines = html.split('\n');
    const result = [];
    let currentParagraph = [];

    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // Skip empty lines and existing HTML tags
      if (!trimmedLine) {
        if (currentParagraph.length > 0) {
          result.push(`<p>${currentParagraph.join(' ')}</p>`);
          currentParagraph = [];
        }
        result.push('');
      } else if (this.isHtmlTag(trimmedLine)) {
        if (currentParagraph.length > 0) {
          result.push(`<p>${currentParagraph.join(' ')}</p>`);
          currentParagraph = [];
        }
        result.push(line);
      } else {
        currentParagraph.push(trimmedLine);
      }
    }

    // Handle any remaining paragraph
    if (currentParagraph.length > 0) {
      result.push(`<p>${currentParagraph.join(' ')}</p>`);
    }

    return result.join('\n');
  }

  /**
   * Check if line starts with HTML tag
   */
  isHtmlTag(line) {
    return /^<\/?[a-zA-Z][^>]*>/.test(line);
  }

  /**
   * Clean up HTML
   */
  cleanupHtml(html) {
    return html
      .replace(/\n{3,}/g, '\n\n') // Remove excessive line breaks
      .replace(/^\n+|\n+$/g, '') // Remove leading/trailing newlines
      .trim();
  }

  /**
   * Escape HTML characters
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Reset parser state
   */
  reset() {
    this.codeBlocks = [];
    this.inlineCodes = [];
    this.tableCount = 0;
    this.linkIndex = 1;
    this.footnotes = [];
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MarkdownParser;
} 