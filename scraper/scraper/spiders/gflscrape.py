from scrapy import Spider
from scrapy import Request
from scrapy import Selector
from bs4 import BeautifulSoup
from html.parser import HTMLParser

class GFLWikiSpider(Spider):
  name = "gflWiki"
  #allowed_domains = ["gfwiki.com/"]
  start_urls = [
    "https://en.gfwiki.com/wiki/Category:HG_T-Dolls"
  ]

  custom_settings = {
        'DEPTH_LIMIT': 2
  }

  def __init__(self):
    self.links=[]


  def parse(self, response):
    links = []
    for tdoll_url in response.xpath('//div[@class="mw-category"]').getall():
      soup = BeautifulSoup(tdoll_url, "lxml")
      for a in soup.findAll('a', href=True):
        tdoll_link = "https://en.gfwiki.com/" + a['href']
        links.append(tdoll_link)
        print(tdoll_link)
    for url in links:
      yield Request(url, callback=self.tdoll_parser)
        

  def tdoll_parser(self, response):
    res = response.xpath('//h1[@id="firstHeading"]')
    print("parser for tdoll " + str(res))
    
'''  def parse(self, response):
    for tdoll_url in response.xpath('//div[@class="mw-category"]'):
      print(tdoll_url)
            for tdoll_url in response.xpath('//div[@class="mw-category"]//div['+ str(num) +']//ul['+ str(num) +']//li['+ str(num) +']').extract():

'''