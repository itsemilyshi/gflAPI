from scrapy import Spider

class GFLWikiSpider(Spider):
  name = "gflWiki"
  allowed_domains = ["https://en.gfwiki.com/"]
  start_urls = [
    "https://en.gfwiki.com/wiki/Category:HG_T-Dolls"
  ]