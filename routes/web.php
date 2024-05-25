<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Landing');
});

Route::get('/Cadastro', function () {
    return Inertia::render('Cadastro');
});

Route::get('/Erro', function () {
    return Inertia::render('Erro');
});

Route::get('/Test', function () {
    return Inertia::render('Test');
});