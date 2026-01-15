<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\CartItem;

class UpdateCartItemPrices extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'cart:update-prices';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update cart item prices to reflect current offers';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Updating cart item prices...');

        $items = CartItem::with('product.activeOffer')->get();

        $updated = 0;
        foreach ($items as $item) {
            $currentPrice = $item->product->active_offer 
                ? $item->product->active_offer->discount_price 
                : $item->product->price;

            if ($item->price != $currentPrice) {
                $item->price = $currentPrice;
                $item->save();
                $updated++;
            }
        }

        $this->info("Updated {$updated} cart items.");
        return 0;
    }
}
