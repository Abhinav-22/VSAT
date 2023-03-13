from flask import Flask
import ssl
import socket
import whois
import dns.resolver

from requests_html import HTMLSession
from bs4 import BeautifulSoup

import requests
import time
import requests
import re

details={}
class MyScripts:
    def __init__(self):
        self.app = Flask(__name__)

        @self.app.route('/individual')
        def script1():       
            def get_ssl_whois_info(hostname,domain):
                details.update({'domain_name':domain})
                context = ssl.create_default_context()
                conn = context.wrap_socket(socket.socket(socket.AF_INET), server_hostname=hostname)
                conn.connect((hostname, 443))
                ssl_info = conn.getpeercert()
                details.update({'SSL_details':ssl_info})
                try:
                    w = whois.whois(domain)
                    details.update({'Domain details':w})
                except Exception as e:
                    print(f'Error getting WHOIS info for {domain}: {e}')
                  #  details.update({'Domain details':'none'})
                return details
            hostname ="www.rajagiritech.ac.in"
            domain="rajagiritech.ac.in"
            ssl_info = get_ssl_whois_info(hostname,domain)
            # print(ssl_info)
          #  def get_whois_info(domain):
           #     try:
           #         w = whois.whois(domain)
           #         return w
           #     except Exception as e:
           #         print(f'Error getting WHOIS info for {domain}: {e}')
           #         return None
           # domain = input()
           # domain="google.com"
           # whois_info = get_whois_info(domain)
           # if whois_info:
           #     print(f'WHOIS info for {domain}:')
           #     print(whois_info)
            return details
        list=[]
        enterprise_detail={}
        @self.app.route('/enterprise')
        def script2():
            # code for script2
            #domain=input()
            domain="rajagiritech.ac.in"
            def get_records(domain):
            
                ids = [
                    'NONE',
                    'A',
                    'NS',
                    'MD',
                    'MF',
                    'CNAME',
                    'SOA',
                    'MB',
                    'MG',
                    'MR',
                    'NULL',
                    'WKS',
                    'PTR',
                    'HINFO',
                    'MINFO',
                    'MX',
                    'TXT',
                    'RP',
                    'AFSDB',
                    'X25',
                    'ISDN',
                    'RT',
                    'NSAP',
                    'NSAP-PTR',
                    'SIG',
                    'KEY',
                    'PX',
                    'GPOS',
                    'AAAA',
                    'LOC',
                    'NXT',
                    'SRV',
                    'NAPTR',
                    'KX',
                    'CERT',
                    'A6',
                    'DNAME',
                    'OPT',
                    'APL',
                    'DS',
                    'SSHFP',
                    'IPSECKEY',
                    'RRSIG',
                    'NSEC',
                    'DNSKEY',
                    'DHCID',
                    'NSEC3',
                    'NSEC3PARAM',
                    'TLSA',
                    'HIP',
                    'CDS',
                    'CDNSKEY',
                    'CSYNC',
                    'SPF',
                    'UNSPEC',
                    'EUI48',
                    'EUI64',
                    'TKEY',
                    'TSIG',
                    'IXFR',
                    'AXFR',
                    'MAILB',
                    'MAILA',
                    'ANY',
                    'URI',
                    'CAA',
                    'TA',
                    'DLV',
                ]

                for a in ids:
                    try:
                        answers = dns.resolver.resolve(domain, a)
                        for rdata in answers:
                            print(a, ':', rdata.to_text())
                            s=a+' : '+rdata.to_text()
                            list.append(s)
                    except Exception as e:
                        pass  # or pass
            get_records(domain)
            enterprise_detail.update({'DNS Resolution':list})

            #URL Redirection
            url="https://rajagiritech.ac.in"
            links = []
            session = HTMLSession()
            response = session.get(url)
            soup = BeautifulSoup(response.text,'lxml')
            for link in soup.find_all('a',href=True):
                if(link['href'].startswith('./')):
                    link['href'] = url + link['href']
                if(link['href'].startswith('/')):
                    link['href'] = url + link['href']
                if(link['href'].startswith('#')):
                    continue
                if(link['href'].startswith('http')):
                    links.append(link['href'])
                print('-------------------------------------')
                print("Crawling the target website.....")
                print("Links presesnt on this website-")
                i=0
               # for link in links:
                  #  print(link)
            #print(links)
            enterprise_detail.update({'URL Redirection':links})

            #loading time
            start = time.time()
            response = requests.get("https://www.w3schools.com/python/python_casting.asp")
            end = time.time()
            elapsed_time = end - start
            print("Time elapsed: ", elapsed_time)
            enterprise_detail.update({"Time elapsed before loading: ": elapsed_time})

            #web technologies
            weblist={}
            def get_server_header(url):
                """Returns the server header of a website"""
                try:
                    response = requests.get(url)
                    return response.headers['server']
                except:
                    return None

            def get_web_technologies(url):
                """Returns a list of possible web technologies used by a website"""
                try:
                    response = requests.get(url)
                    technologies = []
                    if 'X-Powered-By' in response.headers:
                        technologies.extend(re.findall('[\w-]+', response.headers['X-Powered-By']))
                    if 'X-AspNet-Version' in response.headers:
                        technologies.append('ASP.NET')
                    if 'X-Drupal-Cache' in response.headers:
                        technologies.append('Drupal')
                    if 'X-Generator' in response.headers:
                        technologies.extend(re.findall('[\w-]+', response.headers['X-Generator']))
                    content = response.text
                    if 'react' in content:
                        technologies.append('React')
                    if 'Django' in content:
                        technologies.append('Django')
                    if 'next/static' in content:
                        technologies.append('Next.js')
                    if 'Astro' in content:
                        technologies.append('Astro')
                    if 'wp-' in content:
                      technologies.append('Wordpress')
                    if 'bootstrap' in content:
                      technologies.append('Bootstrap')
                    if 'php' in content:
                      technologies.append('PHP')
                    if 'jquery' in content:
                      technologies.append('JQuery')
                    return list(set(technologies))
                    if 'jsp' in content:
                      technologies.append('JSP')
                    if 'webpack' in content:
                      technologies.append('Webpack')
                    if 'ghost/' in content:
                      technologies.append('Ghost')
                    return list(set(technologies))

                except:
                    return None

            def main(url):
                server = get_server_header(url)
                technologies = get_web_technologies(url)
                if server:
                    print(f"Server: {server}")
                    #weblist.append(server)
                    weblist.update({'server':server})
                if technologies:
                    print(f"Technologies: {', '.join(technologies)}")
                    #weblist.append(', '.join(technologies))
                    weblist.update({'Technologies':technologies})
                else:
                    print("Could not determine server or technologies.")
                    weblist.update({'Technology':"Could not determine server or technologies."})
        
            #url = input("Enter a website URL: ")
            main(url)
            enterprise_detail.update({'Web Technologies':weblist})
            return enterprise_detail



        # ... other routes and scripts ...

    def run(self):
        self.app.run(debug=True)

if __name__ == '__main__':
    my_scripts = MyScripts()
    my_scripts.run()
