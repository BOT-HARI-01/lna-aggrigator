from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import WebDriverException
from bs4 import BeautifulSoup
import requests
import time
import random

def fetch_links_from_dev_to(tag, max_links=20):
    base_url = f"https://dev.to/t/{tag}/"  # Dev.to tags URL

    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    service = Service("/usr/bin/chromedriver")

    driver = None
    links = set()

    try:
        driver = webdriver.Chrome(service=service, options=chrome_options)
        driver.set_page_load_timeout(15)
        driver.get(base_url)

        while len(links) < max_links:
            soup = BeautifulSoup(driver.page_source, 'html.parser')
            link_elements = soup.find_all('a', class_='crayons-story__hidden-navigation-link')
            new_links = [link['href'] for link in link_elements if 'href' in link.attrs]
            links.update(new_links)

            # Scroll to the bottom to load more links
            driver.find_element(By.TAG_NAME, "body").send_keys(Keys.END)
            time.sleep(random.uniform(1, 3))

            # Break the loop if no new links are found
            if not new_links:
                break

    except WebDriverException as e:
        print(f"WebDriver error: {e}")
    except Exception as e:
        print(f"Unexpected error occurred: {e}")
    finally:
        if driver:
            driver.quit()

    return list(links)

def fetch_blog_details(url):
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()

        soup = BeautifulSoup(response.content, 'html.parser')
        title = soup.find('h1', class_="fs-3xl m:fs-4xl l:fs-5xl fw-bold s:fw-heavy lh-tight mb-2 longer")
        content = soup.find('div', class_="crayons-article__body text-styles spec__body")  # Main content
        image_tag = soup.find('img', class_='crayons-article__cover__image')

        title = title.text.strip() if title else None
        image_url = None
        if image_tag and 'src' in image_tag.attrs:
            image_url = image_tag['src']

        if not title or not content:
            return {"error": "Required elements not found"}

        return {
            "title": title,
            "content": content.text.strip(),
            "image_url": image_url
        }

    except requests.exceptions.RequestException as e:
        return {"error": "Request failed", "details": str(e)}
    except Exception as e:
        return {"error": "Unexpected error occurred", "details": str(e)}

# Example usage:

if __name__ == "__main__":
    tag = "python"  # Example tag
    print(f"Fetching links for tag: {tag}")
    
    # Fetch links
    links = fetch_links_from_dev_to(tag)
    print(f"Found {len(links)} links:")
    for link in links:
        print(link)
    
    # Fetch details for the first article (example)
    if links:
        print(f"\nFetching details for the first article: {links[0]}")
        blog_details = fetch_blog_details(links[0])
        print(blog_details)

