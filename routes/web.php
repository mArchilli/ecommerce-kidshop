<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\ColorController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentStatusController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SizeController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\CheckRole;

Route::get('/', [ProductController::class, 'showProducts'])->name('welcome');

// Nueva ruta para el catálogo
Route::get('/catalog', [ProductController::class, 'catalog'])->name('catalog.index');

Route::get('/admin/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified', CheckRole::class . ':admin'])->name('dashboard');

Route::middleware(['auth', 'verified', CheckRole::class . ':admin'])->group(function () {
    Route::get('/admin/products', [ProductController::class, 'index'])->name('products.index');
    Route::get('/admin/products/create', [ProductController::class, 'create'])->name('products.create');
    Route::post('/admin/products', [ProductController::class, 'store'])->name('products.store');
    Route::get('/admin/products/{product}/edit', [ProductController::class, 'edit'])->name('products.edit');
    Route::post('/admin/products/{product}', [ProductController::class, 'update'])->name('products.update');
    Route::get('/admin/products/{product}/delete', [ProductController::class, 'delete'])->name('products.delete');
    Route::delete('/admin/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');
});

Route::get('/products/{product}', [ProductController::class, 'show'])->name('products.show');

Route::middleware(['auth', 'verified', CheckRole::class . ':admin'])->group(function () {
    Route::get('/admin/categories', [CategoryController::class, 'index'])->name('categories.index');
    Route::get('/admin/categories/create', [CategoryController::class, 'create'])->name('categories.create');
    Route::post('/admin/categories', [CategoryController::class, 'store'])->name('categories.store');
    Route::get('/admin/categories/{category}/edit', [CategoryController::class, 'edit'])->name('categories.edit');
    Route::put('/admin/categories/{category}', [CategoryController::class, 'update'])->name('categories.update');
    Route::delete('/admin/categories/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');
    Route::get('/admin/categories/{category}/delete', [CategoryController::class, 'delete'])->name('categories.delete');

    Route::get('/admin/colors', [ColorController::class, 'index'])->name('colors.index');
    Route::get('/admin/colors/create', [ColorController::class, 'create'])->name('colors.create');
    Route::post('/admin/colors', [ColorController::class, 'store'])->name('colors.store');
    Route::get('/admin/colors/{color}/edit', [ColorController::class, 'edit'])->name('colors.edit');
    Route::put('/admin/colors/{color}', [ColorController::class, 'update'])->name('colors.update');
    Route::delete('/admin/colors/{color}', [ColorController::class, 'destroy'])->name('colors.destroy');
    Route::get('/admin/colors/{color}/delete', [ColorController::class, 'delete'])->name('colors.delete');

    Route::get('/admin/sizes', [SizeController::class, 'index'])->name('sizes.index');
    Route::get('/admin/sizes/create', [SizeController::class, 'create'])->name('sizes.create');
    Route::post('/admin/sizes', [SizeController::class, 'store'])->name('sizes.store');
    Route::get('/admin/sizes/{size}/edit', [SizeController::class, 'edit'])->name('sizes.edit');
    Route::put('/admin/sizes/{size}', [SizeController::class, 'update'])->name('sizes.update');
    Route::delete('/admin/sizes/{size}', [SizeController::class, 'destroy'])->name('sizes.destroy');
    Route::get('/admin/sizes/{size}/delete', [SizeController::class, 'delete'])->name('sizes.delete');

    Route::get('/admin/orders', [OrderController::class, 'index'])->name('admin.orders.index');
    Route::get('/admin/orders/{order}', [OrderController::class, 'show'])->name('orders.show');
    Route::put('/admin/orders/{order}/shipping-status', [OrderController::class, 'updateShippingStatus'])->name('orders.updateShippingStatus');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
    Route::post('/cart/add/{product}', [CartController::class, 'add'])->name('cart.add');
    Route::put('cart/update/{cartItem}', [CartController::class, 'update'])->name('cart.update');
    Route::put('/cart/update-all', [CartController::class, 'updateAll'])->name('cart.updateAll');
    Route::delete('/cart/remove/{cartItem}', [CartController::class, 'remove'])->name('cart.remove');
    Route::delete('/cart/clear', [CartController::class, 'clear'])->name('cart.clear');
});

// Rutas para el proceso de checkout
Route::middleware('auth')->group(function () {
     
});

Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout.index'); 
Route::post('/checkout/payment', [CheckoutController::class, 'payment'])->name('checkout.payment');
Route::get('/payment/success', [PaymentStatusController::class, 'success'])->name('payment.success');
Route::get('/payment/failure', [PaymentStatusController::class, 'failure'])->name('payment.failure');
Route::get('/payment/pending', [PaymentStatusController::class, 'pending'])->name('payment.pending');

// Rutas para la verificación de correo electrónico
Route::get('/email/verify', function () {
    return view('auth.verify-email');
})->middleware('auth')->name('verification.notice');

Route::get('/email/verify/{id}/{hash}', [VerifyEmailController::class, '__invoke'])
    ->middleware(['auth', 'signed'])->name('verification.verify');

Route::post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();
    return back()->with('message', 'Verification link sent!');
})->middleware(['auth', 'throttle:6,1'])->name('verification.send');



require __DIR__.'/auth.php';

// Ruta catch-all para manejar 404 con Inertia
use Inertia\Inertia as InertiaInertia;
Route::fallback(function () {
    return InertiaInertia::render('Errors/NotFound');
});