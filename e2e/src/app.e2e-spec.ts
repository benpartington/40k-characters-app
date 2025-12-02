import { browser, element, by, logging } from 'protractor';

describe('first-app-lesson-01 app', () => {

  beforeEach(() => browser.get(''));

  it('should display correct title', async () => {
    expect(await element.all(by.css('h1')).get(0).getText()).toEqual('Hello world!');
  });

  it('clicking logo returns to main page', async () => {
    await browser.get('/details/1');
    await element(by.css('.brand-logo')).click();
    // Verify that the main page includes the filter input
    expect(await element(by.css('input[placeholder="Filter by faction"]')).isPresent()).toBe(true);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
