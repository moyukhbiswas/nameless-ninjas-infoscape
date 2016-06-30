import re
import mechanize

from bs4 import BeautifulSoup
soup = BeautifulSoup(open('index.html'), 'html.parser')

print soup

