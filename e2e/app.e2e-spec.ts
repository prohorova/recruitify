import { BegaPage } from './app.po';

describe('bega App', () => {
  let page: BegaPage;

  beforeEach(() => {
    page = new BegaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
