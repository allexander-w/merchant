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
                <nuxt-link to='/signin' class="header-login-text">Войти</nuxt-link>
            </div>
        </div>
</template>
