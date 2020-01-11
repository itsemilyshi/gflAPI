from scrapy import Spider
from scrapy import Request
from scrapy import Selector
from bs4 import BeautifulSoup
from html.parser import HTMLParser
from scraper.items import ScraperItem
import time #just in case i need to pause between requests

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
    doll = ScraperItem()
    res = response.xpath('//h1[@id="firstHeading"]').get()
    soup = BeautifulSoup(res, "lxml")
    doll['name'] = soup.get_text('h1')
    skillnamexpath = response.xpath('//div[@class="skilldataraw"]//tr[1]//td[1]').get()
    soup = BeautifulSoup(skillnamexpath, 'lxml')
    skill_name = str(soup.get_text('td'))
    doll['skill_name'] = skill_name
    print("parser for tdoll " + doll['name'] + ' skill name = ' + doll['skill_name'])
    #self.links.append(doll)
    yield doll
    