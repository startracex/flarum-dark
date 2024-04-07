import { extend } from 'flarum/common/extend';
import Page from 'flarum/common/components/Page';
import { preferTheme, setStyle } from '../common';

extend(Page.prototype, 'oninit', () => {
  setStyle(preferTheme());
});
