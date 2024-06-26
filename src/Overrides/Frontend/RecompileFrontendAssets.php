<?php

/*
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Flarum\Frontend;

use Flarum\Locale\LocaleManager;
use Flarum\Settings\Event\Saved;

/**
 * @internal
 */
class RecompileFrontendAssets
{
    /**
     * @var Assets
     */
    protected $assets;

    /**
     * @var LocaleManager
     */
    protected $locales;

    /**
     * @param Assets        $assets
     * @param LocaleManager $locales
     */
    public function __construct(Assets $assets, LocaleManager $locales)
    {
        $this->assets = $assets;
        $this->locales = $locales;
    }

    public function whenSettingsSaved(Saved $event)
    {
        // @deprecated 'theme_' check, to be removed in 2.0
        if (preg_grep('/^theme_/i', array_keys($event->settings))) {
            $this->flushCss();
        }
    }

    public function flush()
    {
        $this->flushCss();
        $this->flushJs();
    }

    protected function flushCss()
    {
        $this->assets->makeCss()->flush();

        $this->assets->makeDarkCss()->flush();

        foreach ($this->locales->getLocales() as $locale => $name) {
            $this->assets->makeLocaleCss($locale)->flush();
        }
    }

    protected function flushJs()
    {
        $this->assets->makeJs()->flush();

        foreach ($this->locales->getLocales() as $locale => $name) {
            $this->assets->makeLocaleJs($locale)->flush();
        }
    }
}
