import requests
import re
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import time

wd="www.sportingnews.com"
webdict = {}
url = "https://"+wd
try:
    response = requests.get(url)

    server = response.headers.get('server')
    if server:
        webdict.update({"Server": server})

        technologies = []
        content = response.text.lower()
        if 'x-powered-by' in response.headers:
            technologies.extend(re.findall(
                '[\w-]+', response.headers['X-Powered-By']))
        if 'x-aspnet-version' in response.headers:
            technologies.append('ASP.NET')
        if 'x-drupal-cache' in response.headers:
            technologies.append('Drupal')
        if 'x-generator' in response.headers:
            technologies.extend(re.findall(
                '[\w-]+', response.headers['X-Generator']))
      
        if 'django' in content:
            technologies.append('Django')
        if 'next/static' in content:
            technologies.append('Next.js')
        if 'astro' in content:
            technologies.append('Astro')
        if 'wp-' in content:
            technologies.append('Wordpress')
        if 'bootstrap' in content:
            technologies.append('Bootstrap')
        if 'php' in content:
            technologies.append('PHP')
        if 'jsp' in content:
            technologies.append('JSP')
        if 'webpack' in content:
            technologies.append('Webpack')
        if 'ghost/' in content:
            technologies.append('Ghost')
        if 'django' in response.text.lower():
            technologies.append('Django')
        if 'laravel' in response.text.lower():
            technologies.append('Laravel')
        if 'rails' in response.text.lower():
            technologies.append('Ruby on Rails')
        if 'spring' in response.text.lower():
            technologies.append('Spring')
        if 'symfony' in response.text.lower():
            technologies.append('Symfony')
        if 'express' in response.text.lower():
            technologies.append('Express.js')
        if 'sites.google.com' in response.text.lower():
            technologies.append('Google Sites')

        # Look for JavaScript libraries
        if 'jquery' in response.text.lower():
            technologies.append('jQuery')
        if 'react' in response.text.lower():
            technologies.append('React')
        if 'vue' in response.text.lower():
            technologies.append('Vue.js')
        if 'angular' in response.text.lower():
            technologies.append('Angular')

        # Look for CSS frameworks
        if 'bootstrap' in response.text.lower():
            technologies.append('Bootstrap')
        if 'foundation' in response.text.lower():
            technologies.append('Foundation')

        # Look for CMS platforms
        if 'wordpress' in response.text.lower():
            technologies.append('WordPress')
        if 'joomla' in response.text.lower():
            technologies.append('Joomla!')
        if 'drupal' in response.text.lower():
            technologies.append('Drupal')

        # Look for e-commerce platforms
        if 'magento' in response.text.lower():
            technologies.append('Magento')
        if 'shopify' in response.text.lower():
            technologies.append('Shopify')

        # Look for web servers
        if 'nginx' in response.headers.get('server', '').lower():
            technologies.append('nginx')
        if 'apache' in response.headers.get('server', '').lower():
            technologies.append('Apache')

        if technologies:
            webdict.update({"Technologies": technologies})
        else:
            webdict.update({"Info": "No technologies found."})
except:
        webdict.update(
            {"Info": "An error occurred while trying to fetch the website."})
print (webdict)
index = None

if 'Technologies' in webdict:
    index = list(webdict).index('Technologies')
lst=[]
lst = list(webdict.values())[1]
llen=len(lst)
print(lst)
resdict={}
print(llen)
chrome_options = Options()

chrome_options.add_argument("--headless")

chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--window-size=1920,1080")



try:
    url = "https://nvd.nist.gov/vuln/search"
    driver = webdriver.Chrome(options=chrome_options)
    driver.get(url)

    for i in range(0,llen-1):
        e3 = driver.find_element(By.NAME,'query').send_keys(lst[i])
        submit = driver.find_element(By.XPATH, '//*[@id="vuln-search-submit"]')
        submit.click()
        time.sleep(8)


        for i in range(1,6):
            submit = driver.find_element(By.XPATH, '//*[@id="row"]/table/tbody/tr[' + str(i) + ']/th/strong/a')
            
            e = driver.find_element(By.XPATH, '//*[@id="row"]/table/tbody/tr[' + str(i) +']/td[2]' ) 
            #print(e.text)
            resdict.update({submit.text:e.text})

except Exception as e:
    print("check spelling bro",e)
print(resdict)