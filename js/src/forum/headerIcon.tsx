import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import HeaderSecondary from 'flarum/forum/components/HeaderSecondary';
import Button from 'flarum/common/components/Button';
import { packageID } from '../common/id';
import { mediaPreferences, updateTheme, userPreferences } from '../common';
import { Theme, nextTheme } from '../common/theme';

const autoClass = 'fa fa-adjust';
const lightClass = 'fa fa-sun';
const darkClass = 'fa fa-moon';

const headerIcon = () => {
  extend(HeaderSecondary.prototype, 'items', function (items) {
    const user = app.session?.user;
    const current = userPreferences() || mediaPreferences();
    const label = app.translator.trans(`${packageID}.forum.header.toggle`);

    items.add(
      'theme',
      <Button
        className="Button Button--flat"
        onclick={() => {
          updateTheme(nextTheme(current), user);
        }}
        icon={current === Theme.AUTO ? autoClass : current === Theme.LIGHT ? lightClass : darkClass}
        aria-label={label}
      >
        {label}
      </Button>,
      11
    );
  });
};

export default headerIcon;
