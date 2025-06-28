# Markdown A4 Printer

Beautiful A4-optimized HTML conversion for Markdown documents with Apple-inspired grayscale design.

![Markdown A4 Printer](https://img.shields.io/badge/Markdown-A4%20Printer-black?style=for-the-badge&logo=markdown)
![Version](https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## ✨ Features

- 🎨 **Apple-inspired grayscale design** - Clean, professional appearance
- 📄 **Perfect A4 print optimization** - Optimized for A4 paper with proper margins and page breaks
- 📊 **Beautiful table rendering** - Professional table styling with stripes and borders
- 🔗 **Full Markdown support** - Complete support for headings, lists, code blocks, links, and more
- 🖨️ **Print-ready output** - One-click printing with optimized layouts
- 📱 **Responsive design** - Works perfectly on desktop, tablet, and mobile devices
- ⚡ **Fast conversion** - Instant Markdown to HTML conversion
- 💾 **Export functionality** - Save converted documents as HTML files
- 🎯 **Template system** - Multiple document templates for different use cases

## 🚀 Quick Start

### Online Version
Visit: **[Markdown A4 Printer](https://your-username.github.io/markdown-a4-printer)**

### Local Development
```bash
# Clone the repository
git clone https://github.com/your-username/markdown-a4-printer.git

# Navigate to project directory
cd markdown-a4-printer

# Open in your browser
open index.html
```

No build process required! This is a pure client-side application.

## 🛠️ Usage

1. **Load Markdown File**
   - Click "Load Markdown File" button
   - Or drag & drop your `.md` file into the interface

2. **Choose Template**
   - Select from Business, Academic, Report, or Modern templates

3. **Customize Settings**
   - Toggle page numbers
   - Enable/disable table stripes
   - Activate compact mode for denser layouts

4. **Preview & Print**
   - Click "Preview" to see print layout
   - Click "Print A4" for perfect printing
   - Use "Save HTML" to export the document

## 📘 Writing Guide

For best results when creating Markdown documents for A4 printing, please refer to our comprehensive writing guidelines:

**👉 [Markdown A4 プリンター 使用ガイドライン](MARKDOWN_GUIDELINES.md)**

This guide provides:
- ✅ Best practices for structure and formatting
- ❌ Common mistakes to avoid
- 📊 Sample templates for different document types
- 🎨 Layout optimization tips
- 🔧 Troubleshooting common issues

**Key principles:**
- Use proper Markdown structure instead of relying on complex processing
- Split long content into appropriate paragraphs and lists
- Utilize tables for complex data presentation
- Follow consistent formatting patterns

## 📋 Supported Markdown Features

| Feature | Syntax | Output |
|---------|--------|--------|
| **Headers** | `# ## ### #### ##### ######` | H1-H6 headings with proper hierarchy |
| **Bold** | `**text**` or `__text__` | **Bold text** |
| **Italic** | `*text*` or `_text_` | *Italic text* |
| **Strikethrough** | `~~text~~` | ~~Strikethrough text~~ |
| **Tables** | `\| header \| header \|` | Professional bordered tables |
| **Lists** | `- item` or `1. item` | Bullet points and numbered lists |
| **Code** | `\`code\`` or `\`\`\`code\`\`\`` | Inline and block code |
| **Blockquotes** | `> quote` | Styled quote blocks |
| **Links** | `[text](url)` | Clickable links |
| **Images** | `![alt](url)` | Embedded images |
| **Horizontal Rules** | `---` or `***` | Section dividers |

## 🎨 Design Philosophy

### Apple-Inspired Aesthetics
- Clean, minimalist interface
- Carefully chosen grayscale color palette
- Subtle shadows and rounded corners
- Perfect typography with Inter font family

### Print-First Approach
- A4 paper size optimization (210mm × 297mm)
- 20mm margins on all sides
- Optimized font sizes (16px screen → 10pt print)
- Page break controls for tables and headings
- Automatic page numbering

## 🖨️ Print Settings

For best results, use these browser print settings:

- **Paper size**: A4
- **Margins**: Minimum or None (margins are handled by CSS)
- **Background graphics**: Enabled
- **Scale**: 100%

### Recommended Print Workflow

1. Load your Markdown file
2. Choose appropriate template
3. Click "Preview" to check layout
4. Adjust settings if needed
5. Click "Print A4" for final output

## 🔧 Configuration

### Template Customization

The application includes four built-in templates:

- **Business**: Professional documents with formal styling
- **Academic**: Research papers and academic writing
- **Report**: Technical reports and documentation
- **Modern**: Contemporary design for creative content

### Settings Options

- **Show page numbers**: Add page numbers to printed documents
- **Table row stripes**: Alternate row colors for better readability
- **Compact mode**: Reduce spacing for denser layouts

## 📱 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Fully supported |
| Firefox | 88+ | ✅ Fully supported |
| Safari | 14+ | ✅ Fully supported |
| Edge | 90+ | ✅ Fully supported |

## 🚀 Deployment

### GitHub Pages

1. Fork this repository
2. Enable GitHub Pages in repository settings
3. Select source: "Deploy from a branch" → "main"
4. Your app will be available at `https://username.github.io/markdown-a4-printer`

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/your-username/markdown-a4-printer)

1. Click the "Deploy to Netlify" button
2. Connect your GitHub account
3. Deploy automatically

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/markdown-a4-printer)

1. Click the "Deploy with Vercel" button
2. Import your repository
3. Deploy with one click

### Manual Deployment

Simply upload all files to any web server. No server-side processing required.

## 🧪 Testing

### Sample Files

Test the application with the included sample files:

- `examples/sample.md` - Comprehensive feature test
- `examples/business-doc.md` - Business document example
- `examples/technical-spec.md` - Technical specification example

### Manual Testing Checklist

- [ ] File loading (drag & drop + file picker)
- [ ] Markdown conversion accuracy
- [ ] Print preview functionality
- [ ] A4 print output quality
- [ ] Mobile responsiveness
- [ ] All template styles
- [ ] Settings persistence
- [ ] HTML export feature

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Code Style Guidelines

- Use ES6+ JavaScript features
- Follow semantic HTML structure
- Maintain CSS custom properties for theming
- Include comments for complex functions
- Test across multiple browsers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-username/markdown-a4-printer/issues) page
2. Create a new issue with detailed description
3. Include browser version and steps to reproduce

## 🔮 Roadmap

### Version 1.1
- [ ] Custom CSS injection
- [ ] More template options
- [ ] Dark mode support
- [ ] Multi-language support

### Version 1.2
- [ ] PDF direct export
- [ ] Batch file processing
- [ ] Plugin system
- [ ] Cloud storage integration

### Version 2.0
- [ ] Real-time collaborative editing
- [ ] Advanced table editor
- [ ] Chart and diagram support
- [ ] Advanced typography controls

## 🙏 Acknowledgments

- [Inter Font](https://rsms.me/inter/) - Beautiful typography
- [Markdown Guide](https://www.markdownguide.org/) - Markdown reference
- Apple Design Guidelines - Design inspiration

---

**Made with ❤️ for the developer community**

*Create beautiful, print-ready documents from Markdown with ease.* 