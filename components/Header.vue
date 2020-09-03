<template>
        <div class="header">
            <div class="header-logo">
                <img src="../assets/img/logo.svg" alt="logo">
            </div>

            <div class="header-nav">
                <ul class="header-navigation">
                    <li class="header-nav-item">Возможности</li>
                    <li class="header-nav-item">Коннекторы</li>
                    <li class="header-nav-item">Тарифы</li>
                    <li class="header-nav-item">База знаний</li>
                </ul>
            </div>

            <div class="header-login">
                <i class="fad fa-sign-in-alt sign-in-icon"></i>
                <span class="header-login-text" @click='$router.push("/signin")'>Войти</span>
            </div>
        </div>
</template>
