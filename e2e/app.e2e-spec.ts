import { BlocktixPage } from './app.po';

describe('blocktix App', function() {
  let page: BlocktixPage;

  beforeEach(() => {
    page = new BlocktixPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
