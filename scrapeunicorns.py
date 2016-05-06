#---------------------------------------------------------
# Pratik Nadagouda
# pnadagouda@berkeley.edu
# scraping unicorn names from website
#---------------------------------------------------------

import sys
import urllib2
from bs4  import BeautifulSoup
from operator import itemgetter

def preprocessPage(content):
    ''' Remove extra spaces between HTML tags. '''
    content = ''.join([line.strip() for line in content.split('\n')])
    return content

def readFile(fileName):
	'''Reads content from a file for testing purposes''' 
	with open(fileName) as f:
		content = f.read()
	return content

def getResults(soup, names):
	'''gets the names and number of reviews in a list using bs4'''
	results = soup.findAll("tbody", "unicorns")
	for result in results:
		row = result.findAll("tr", "unicorn")
		name = result.findAll("td", "black bold")
		names.append((name[0].span.contents[0].strip().encode('utf8')))

def getSoup(url):
	'''reads the webpage from the url'''
	content = urllib2.urlopen(url).read()
	content = preprocessPage(content)
	return BeautifulSoup(content, "html.parser")

def main():
	names = []
	url1 = 'http://techcrunch.com/unicorn-leaderboard/'		
	url2 = 'http://techcrunch.com/unicorn-leaderboard/exited/'
	url3 = 'http://techcrunch.com/unicorn-leaderboard/emerging/'

	soup = getSoup(url1)
	getResults(soup, names)

	soup = getSoup(url2)
	getResults(soup, names)

	soup = getSoup(url3)
	getResults(soup, names)


	f = open("unicorns.txt", 'w')
	for item in names:
		f.write(item[0]+", "+str(item[1])+"\n")

if __name__ == '__main__':
	main()