import { PleaguePage } from './app.po';

describe('pleague App', () => {
  let page: PleaguePage;

  beforeEach(() => {
    page = new PleaguePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
