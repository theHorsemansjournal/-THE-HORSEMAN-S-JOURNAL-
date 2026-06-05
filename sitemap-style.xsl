<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.w3.org/1999/xhtml">
<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
<xsl:template match="/">
  <html>
    <head>
      <title>Sitemap - The Horseman's Journal</title>
      <style>
        body { background: #1a0f0a; color: #f0e6d6; font-family: 'EB Garamond', serif; padding: 2rem; max-width: 900px; margin: 0 auto; }
        h1 { font-family: 'Cinzel Decorative', serif; color: #D4AF37; border-bottom: 1px solid #D4AF37; padding-bottom: 0.5rem; }
        table { width: 100%; border-collapse: collapse; margin-top: 1.5rem; }
        th { text-align: left; font-family: 'Cinzel', serif; color: #D4AF37; padding: 0.5rem; border-bottom: 1px solid #D4AF37; }
        td { padding: 0.5rem; border-bottom: 1px solid rgba(212,175,55,0.2); }
        a { color: #D4AF37; text-decoration: none; }
        a:hover { text-decoration: underline; }
        .count { margin-top: 1rem; font-size: 0.8rem; color: rgba(240,230,200,0.5); }
        hr { border-color: rgba(212,175,55,0.2); margin: 1rem 0; }
      </style>
    </head>
    <body>
      <h1>📄 Sitemap - The Horseman's Journal</h1>
      <p>All pages submitted to Google for indexing.</p>
      <hr/>
      <table>
        <tr><th>URL</th><th>Last Modified</th><th>Priority</th></tr>
        <xsl:for-each select="urlset/url">
          <tr>
            <td><a href="{loc}"><xsl:value-of select="loc"/></a></td>
            <td><xsl:value-of select="lastmod"/></td>
            <td><xsl:value-of select="priority"/></td>
          </tr>
        </xsl:for-each>
      </table>
      <p class="count">Total URLs: <xsl:value-of select="count(urlset/url)"/></p>
    </body>
  </html>
</xsl:template>
</xsl:stylesheet>
