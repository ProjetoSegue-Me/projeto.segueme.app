<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class MockController extends Controller
{
    public function submit(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'login' => 'required|string|max:255',
            'senha' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        dd($request);

        if (Auth::attempt(['login' => $request->login, 'senha' => $request->senha])) {
            $request->session()->regenerate();

            return Inertia::location('/Cadastro');
        }

    }
}
