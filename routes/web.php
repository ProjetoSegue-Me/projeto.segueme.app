<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Landing');
});

Route::get('/Form', function () {
    return Inertia::render('Form');
});

Route::get('/Cadastro', function () {
    return Inertia::render('Cadastro');
});

Route::get('/Eventos', function () {
    return Inertia::render('Eventos');
});

Route::get('/Home', function () {
    return Inertia::render('Home');
});

//TODO: Criar novas rotas dependendo de onde Erro e Sucesso foram tiradas, passar mensagem e redirecionamento por rota
Route::get('/Erro', function () {
    return Inertia::render('Erro');
});

Route::get('/Sucesso', function () {
    return Inertia::render('Sucesso');
});

Route::get('/Cadastro/DetalhesMembro', function () {
    return Inertia::render('DetalhesMembro');
});

Route::get('/Test', function () {
    return Inertia::render('Test');
});

