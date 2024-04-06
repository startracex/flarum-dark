<?php

/*
 * This file is part of startracex/flarum-dark.
 *
 * Copyright (c) startracex.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Startracex\FlarumDark\Content;

use Flarum\Frontend\Document;
use Startracex\FlarumDark\ID;

class ThemeLink
{
    /**
     * @param Document $document
     */
    public function __invoke(Document $document): void
    {
        foreach ($document->head as $line) {
            if (str_contains($line, $document->payload[ID::$packageID . '.assets.light'])) {
                $document->meta['color-scheme'] = 'light';
                break;
            }
            if (str_contains($line, $document->payload[ID::$packageID . '.assets.dark'])) {
                $document->meta['color-scheme'] = 'dark';
                break;
            }
        }
    }
}
