import { MyAngular2Page } from './app.po';

describe('my-angular2 App', () => {
  let page: MyAngular2Page;

  beforeEach(() => {
    page = new MyAngular2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
