<?php

/*
 * This file is part of startracex/flarum-dark.
 *
 * Copyright (c) startracex.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Startracex\FlarumDark;

use Flarum\Foundation\AbstractServiceProvider;
use Flarum\Frontend\Content\Assets as AssetsContent;

class AssetsServiceProvider extends AbstractServiceProvider
{
    public function register(): void
    {
        $this->container->extend(AssetsContent::class, function (AssetsContent $original) {
            return resolve(Content\Assets::class);
        });
    }
}
