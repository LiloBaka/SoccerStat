<template>
  <header class="app-header">
    <div class="container app-header__content">
      <RouterLink class="app-logo" to="/leagues">FIFA</RouterLink>

      <nav class="app-nav" aria-label="Основная навигация">
        <RouterLink class="app-nav__link" to="/leagues">Лиги</RouterLink>
        <RouterLink class="app-nav__link" to="/teams">Команды</RouterLink>
      </nav>
    </div>
  </header>
</template>
