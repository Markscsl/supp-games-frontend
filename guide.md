# SuppGames Vaporwave Design System Guide

## Setup Instructions

1. **Replace your `main.css` or `assets/main.css` with the content from `vaporwave-styles.css`**

2. **Color Palette**
   - Background: `#0a0a1f` (Deep space blue)
   - Secondary: `#1a0a2e` (Dark purple)
   - Accent: `#16213e` (Navy blue)
   - Neon Pink: `#ff00ff`
   - Neon Cyan: `#00ffff`
   - Neon Green: `#22c55e` (for your existing green elements)

---

## Component Adaptations

### 1. Navbar Component

```vue
<template>
  <nav class="sticky top-0 z-50 backdrop-blur-lg bg-[#0a0a1f]/80 border-b-2 border-[#2d1b4e]">
    <div :class="{'flex justify-between items-center': !isAuthPage, 'flex justify-center': isAuthPage}"
         class="max-w-7xl mx-auto px-8 h-20">

      <RouterLink to="/" class="flex items-center gap-3">
        <div class="relative">
          <img src="@/assets/img/icon-ws.png" alt="Logo" class="h-10">
          <div class="absolute inset-0 bg-[#ff00ff] opacity-30 blur-lg rounded-full" />
        </div>
        <span class="font-black text-2xl chrome-text tracking-tight">SUPPGAMES</span>
      </RouterLink>

      <div v-if="!isAuthPage">
        <div v-if="isLoggedIn" class="flex items-center space-x-6">
          <RouterLink to="/" class="text-gray-300 hover:text-[#ff00ff] transition-colors font-medium uppercase">
            Home
          </RouterLink>
          <RouterLink to="/my-list" class="text-gray-300 hover:text-[#00ffff] transition-colors font-medium uppercase">
            Minha Lista
          </RouterLink>
          <span class="text-[#2d1b4e]">|</span>
          <span v-if="user" class="text-gray-400">Olá, <span class="neon-text-cyan">{{ user.name }}</span></span>
          <button @click="logout"
                  class="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 px-4 py-2 rounded-lg text-sm font-bold text-white transition-all duration-300 hover:scale-105 border border-red-500/30">
            Sair
          </button>
        </div>

        <div v-else class="flex items-center space-x-4">
          <RouterLink to="/login"
                      class="px-4 py-2 rounded-lg text-sm font-bold border-2 border-[#00ffff] text-[#00ffff] hover:bg-[#00ffff]/10 transition-all">
            Entrar
          </RouterLink>
          <RouterLink to="/register"
                      class="neon-button-pink px-4 py-2 text-sm">
            Cadastro
          </RouterLink>
        </div>
      </div>
    </div>

    <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#ff00ff] to-transparent opacity-50" />
  </nav>
</template>
```

---

### 2. BaseButton Component

```vue
<template>
  <button :type="type" :class="buttonClasses" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    type: { type: String, default: "button" },
    variant: { type: String, default: "primary" },
    disabled: { type: Boolean, default: false }
  },
  computed: {
    buttonClasses() {
      let baseClasses = 'w-full cursor-pointer h-12 py-3 px-6 mt-6 font-bold rounded-lg transition-all duration-300 focus:outline-none uppercase tracking-wider'

      if (this.disabled) {
        return `${baseClasses} bg-gray-700 text-gray-500 cursor-not-allowed border-2 border-gray-600`
      }

      switch (this.variant) {
        case "secondary":
          return `${baseClasses} bg-gradient-to-r from-[#00ffff] to-[#00cccc] hover:from-[#00cccc] hover:to-[#00ffff] text-black border-2 border-[#00ffff]/30 hover:scale-105 neon-border-cyan`

        case 'danger':
          return `${baseClasses} bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white border-2 border-red-500/30 hover:scale-105`

        default:
          return `${baseClasses} neon-button-pink hover:scale-105`
      }
    }
  }
}
</script>
```

---

### 3. BaseInput Component

```vue
<template>
  <div class="mb-6">
    <label class="block text-white mb-2 font-bold uppercase text-sm tracking-wider neon-text-cyan">
      {{ label }}
    </label>
    <input
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :type="type"
      class="neon-input w-full"
    >
  </div>
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    label: { type: String, required: true },
    type: { type: String, required: true },
    modelValue: { type: String, required: true },
    placeholder: { type: String, default: "" }
  },
  emits: ['update:modelValue']
}
</script>
```

---

### 4. GameCard Component

```vue
<template>
  <div class="card-hover group">
    <div class="relative vaporwave-card rounded-lg overflow-hidden hover:border-[#ff00ff] transition-all duration-300">
      <div class="absolute inset-0 bg-gradient-to-br from-[#ff00ff]/0 to-[#00ffff]/0 group-hover:from-[#ff00ff]/10 group-hover:to-[#00ffff]/10 transition-all duration-300" />

      <div class="relative h-48 overflow-hidden bg-[#0f0f2e]">
        <img :src="game.imageUrl" :alt="game.name"
             class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
        <div class="absolute inset-0 bg-gradient-to-t from-[#0a0a1f] via-transparent to-transparent opacity-60" />

        <button @click="$emit('delete-game', game.id)"
                class="absolute top-3 right-3 bg-red-600/80 hover:bg-red-500 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 border border-red-500/50">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>

      <div class="p-5 relative">
        <h3 class="text-xl font-bold text-white mb-2 group-hover:neon-text-pink transition-all duration-300 truncate">
          {{ game.name }}
        </h3>
      </div>

      <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ff00ff] via-[#00ffff] to-[#ff00ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameCard',
  props: {
    game: { type: Object, required: true }
  },
  emits: ['delete-game']
}
</script>
```

---

### 5. PublicUserCard Component

```vue
<template>
  <div class="vaporwave-card rounded-lg p-6 h-full flex flex-col hover:border-[#00ffff] transition-all duration-300 card-hover">
    <h3 class="font-bold text-xl neon-text-cyan mb-4 border-b border-[#2d1b4e] pb-3 truncate">
      Lista de {{ user.userName }}
    </h3>

    <ul v-if="user.favoriteGames.length > 0" class="space-y-3 flex-grow">
      <li v-for="game in user.favoriteGames" :key="game.id"
          class="flex items-center bg-[#0f0f2e]/50 p-3 rounded-md border border-[#2d1b4e] hover:border-[#ff00ff]/40 transition-all">
        <img :src="game.imageUrl" :alt="game.name"
             class="w-12 h-12 object-cover rounded-md mr-3 flex-shrink-0 border-2 border-[#ff00ff]/20">
        <span class="text-sm text-gray-300 truncate">{{ game.name }}</span>
      </li>
    </ul>

    <div v-else class="text-center text-gray-500 text-sm flex-grow flex items-center justify-center">
      <p class="neon-text-pink opacity-50">Esta lista está vazia.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PublicUserCard",
  props: {
    user: { type: Object, required: true }
  }
}
</script>
```

---

### 6. Footer Component

```vue
<template>
  <div class="relative border-t-2 border-[#2d1b4e] bg-[#0a0a1f]/80 backdrop-blur-lg">
    <div class="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00ffff] to-transparent opacity-50" />

    <div class="max-w-7xl mx-auto px-8 py-8">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-gray-500 text-sm font-bold">
          &copy; WEBSUPPLY 2025 - <span class="neon-text-pink">SUPPGAMES</span>
        </p>

        <div class="flex items-center gap-2">
          <div class="status-online" />
          <span class="text-xs text-gray-500 uppercase tracking-wider">SYSTEM STATUS: OPERATIONAL</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>
```

---

### 7. HomeView - Hero Section

```vue
<template>
  <div>
    <!-- Hero Section for Visitors -->
    <section v-if="!authStore.isLoggedIn"
             class="relative min-h-[70vh] flex items-center justify-center overflow-hidden">

      <!-- Gradient Background -->
      <div class="absolute inset-0 vaporwave-gradient" />

      <!-- Animated Grid -->
      <div class="absolute inset-0 grid-bg opacity-40" />

      <!-- Scan Line Effect -->
      <div class="absolute inset-0 scan-line" />

      <!-- Video Background (Optional - reduce opacity) -->
      <div class="absolute top-1/2 left-1/2 w-[160vw] h-[90vw] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 opacity-20">
        <iframe class="w-full h-full"
                src="https://www.youtube.com/embed/XBIaqOm0RKQ?autoplay=1&mute=1&loop=1&playlist=XBIaqOm0RKQ&controls=0&showinfo=0&autohide=1&modestbranding=1"
                frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
      </div>

      <!-- Dark Overlay -->
      <div class="absolute inset-0 bg-black/50 z-10" />

      <!-- Hero Content -->
      <div class="relative z-20 text-center px-6 max-w-5xl mx-auto">
        <div class="flex justify-center mb-6">
          <div class="relative glitch">
            <img src="@/assets/img/icon-ws.png" alt="Logo" class="h-20 w-20">
            <div class="absolute inset-0 bg-[#00ffff] opacity-30 blur-xl rounded-full" />
          </div>
        </div>

        <h1 class="text-7xl md:text-8xl font-black mb-4 chrome-text tracking-tight">
          SUPPGAMES
        </h1>

        <p class="text-2xl md:text-3xl mb-3 neon-text-cyan font-light tracking-wide">
          YOUR GAME COLLECTION
        </p>

        <div class="text-6xl text-white font-bold h-16 mb-8" ref="typewriter"></div>

        <div class="flex justify-center gap-4 mt-8">
          <RouterLink to="/register">
            <button class="neon-button-pink px-8 py-4 text-lg">
              GET STARTED
            </button>
          </RouterLink>
          <RouterLink to="/login">
            <button class="px-8 py-4 bg-transparent hover:bg-[#2d1b4e] border-2 border-[#00ffff] hover:border-[#ff00ff] rounded-lg font-bold text-white transition-all duration-300 text-lg">
              SIGN IN
            </button>
          </RouterLink>
        </div>

        <div class="mt-12 flex justify-center gap-6 text-sm text-gray-400">
          <div class="flex items-center gap-2">
            <div class="status-online" />
            <span class="uppercase tracking-wider">ONLINE</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="status-active" />
            <span class="uppercase tracking-wider">SYSTEMS OPERATIONAL</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Game Section -->
    <div class="container mx-auto p-8">
      <div v-if="isLoading" class="text-center text-2xl font-light text-gray-400 mt-20 neon-text-cyan">
        CARREGANDO JOGO DO DIA...
      </div>

      <div v-else-if="randomGame" class="animate-fade-in">
        <h1 class="text-4xl md:text-5xl font-black text-center mb-12">
          JOGO EM <span class="neon-text-pink">DESTAQUE</span> DO DIA
        </h1>

        <div class="retro-frame rounded-2xl p-8 max-w-6xl mx-auto">
          <div class="flex flex-col md:flex-row gap-8 items-start">
            <div class="md:w-1/2">
              <img :src="randomGame.background_image"
                   alt="Capa do Jogo"
                   class="w-full h-auto object-cover rounded-lg border-2 border-[#ff00ff]/40">
            </div>

            <div class="md:w-1/2 text-left">
              <h3 class="text-4xl font-black neon-text-cyan mb-4">
                {{ randomGame.name }}
              </h3>

              <div class="mt-4 flex flex-wrap gap-2 mb-4">
                <span v-for="p in randomGame.platforms"
                      :key="p.platform.id"
                      class="bg-[#ff00ff]/20 border border-[#ff00ff]/40 text-[#ff00ff] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {{ p.platform.name }}
                </span>
              </div>

              <p class="text-gray-300 leading-relaxed">
                {{ randomGame.description_raw }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- User's Favorite Games (if logged in) -->
    <div v-if="authStore.isLoggedIn && myFavoriteGames.length > 0"
         class="container mx-auto p-8 mt-12">
      <div class="retro-frame rounded-2xl p-12">
        <h2 class="text-5xl font-black text-center mb-12">
          MINHA <span class="neon-text-cyan">LISTA</span> DE FAVORITOS
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div v-for="game in myFavoriteGames" :key="game.id"
               class="vaporwave-card rounded-lg overflow-hidden card-hover">
            <img :src="game.imageUrl" :alt="game.name"
                 class="w-full h-48 object-cover">
            <div class="p-4">
              <h3 class="text-lg font-bold neon-text-pink">{{ game.name }}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
```

---

### 8. Login & Register Views

```vue
<template>
  <div class="min-h-screen flex items-center justify-center relative overflow-hidden py-12">
    <!-- Animated Background -->
    <div class="absolute inset-0 vaporwave-gradient" />
    <div class="absolute inset-0 grid-bg opacity-30" />
    <div class="absolute inset-0 scan-line" />

    <!-- Login/Register Card -->
    <div class="relative z-10 retro-frame rounded-2xl p-12 w-full max-w-md mx-4">
      <h2 class="text-4xl font-black text-center mb-8 chrome-text">
        {{ isLogin ? 'FAZER LOGIN' : 'CRIAR CONTA' }}
      </h2>

      <form @submit.prevent="isLogin ? login() : register()">
        <BaseInput
          v-if="!isLogin"
          label="Nome"
          type="text"
          v-model="form.name"
          placeholder="Digite seu nome"
        />

        <BaseInput
          label="Email"
          type="email"
          v-model="form.email"
          placeholder="Digite seu e-mail"
        />

        <BaseInput
          label="Senha"
          type="password"
          v-model="form.password"
          placeholder="Digite sua senha"
        />

        <div v-if="errorMessage"
             class="bg-red-600/20 border border-red-500/50 text-red-300 p-4 rounded-lg text-center mb-4 backdrop-blur-sm">
          {{ errorMessage }}
        </div>

        <div v-if="successMessage"
             class="bg-green-600/20 border border-green-500/50 text-green-300 p-4 rounded-lg text-center mb-4 backdrop-blur-sm">
          {{ successMessage }}
        </div>

        <BaseButton :disabled="isLoading" type="submit" variant="primary">
          {{ isLoading ? 'PROCESSANDO...' : (isLogin ? 'ENTRAR' : 'CADASTRAR') }}
        </BaseButton>
      </form>

      <div class="mt-6 text-center">
        <RouterLink :to="isLogin ? '/register' : '/login'"
                    class="text-[#00ffff] hover:text-[#ff00ff] font-bold transition-colors">
          {{ isLogin ? 'Não possui conta? Cadastre-se' : 'Já tem conta? Faça login' }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>
```

---

### 9. MyListView - Search & Grid

```vue
<template>
  <div class="container mx-auto p-8 min-h-screen">
    <!-- Search Bar -->
    <div class="mb-8 max-w-2xl mx-auto">
      <div class="relative">
        <div class="absolute -inset-1 bg-gradient-to-r from-[#ff00ff] via-[#00ffff] to-[#ff00ff] rounded-lg blur opacity-50" />
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Buscar novo jogo para adicionar..."
          class="relative neon-input w-full text-lg"
        >
      </div>
    </div>

    <!-- Search Results -->
    <div v-if="searchResults.length > 0"
         class="vaporwave-card rounded-lg p-6 mb-8 max-w-2xl mx-auto">
      <h3 class="text-xl font-bold mb-4 neon-text-cyan">RESULTADOS DA BUSCA:</h3>
      <ul class="space-y-3">
        <li v-for="game in searchResults" :key="game.id"
            class="flex items-center justify-between p-3 rounded-lg bg-[#0f0f2e]/50 hover:bg-[#2d1b4e] transition-all border border-[#2d1b4e]">
          <span class="text-white">{{ game.name }}</span>
          <button @click="addGame(game.slug)"
                  class="neon-button-pink w-10 h-10 flex items-center justify-center text-xl">
            +
          </button>
        </li>
      </ul>
    </div>

    <!-- Page Title -->
    <div class="text-center mb-12">
      <h1 class="text-5xl md:text-6xl font-black">
        GERENCIAR <span class="neon-text-pink">MINHA LISTA</span>
      </h1>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading"
         class="text-center text-2xl neon-text-cyan mt-20">
      CARREGANDO SUA LISTA...
    </div>

    <!-- Games Grid -->
    <div v-else-if="myFavoriteGames.length > 0"
         class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <GameCard
        v-for="game in myFavoriteGames"
        :key="game.id"
        :game="game"
        @delete-game="handleDeleteGame"
      />
    </div>

    <!-- Load More Button -->
    <div v-if="canLoadMore && !isLoading" class="text-center mt-12">
      <button @click="fetchMyList(true)"
              class="neon-button-cyan px-8 py-4 text-lg">
        CARREGAR MAIS
      </button>
    </div>

    <!-- Empty State -->
    <div v-else-if="myFavoriteGames.length === 0"
         class="text-center retro-frame rounded-2xl p-16 mt-12">
      <p class="text-3xl neon-text-pink mb-4">SUA LISTA ESTÁ VAZIA</p>
      <p class="text-gray-400">Que tal adicionar alguns jogos?</p>
    </div>
  </div>
</template>
```

---

## Quick Tips

1. **Use uppercase text** for headers and buttons to match the retro computer aesthetic
2. **Combine effects**: Use `neon-text-pink` with `chrome-text` for variety
3. **Add `card-hover`** class to any card component for the signature lift effect
4. **Use `retro-frame`** for container sections
5. **Add `status-online` or `status-active`** for animated status indicators
6. **Use `vaporwave-card`** for glassmorphism cards
7. **Add `cyber-lines`** class for top/bottom gradient lines

---

## Background Options

For full-page backgrounds, use:
```vue
<div class="absolute inset-0 vaporwave-gradient" />
<div class="absolute inset-0 grid-bg opacity-40" />
<div class="absolute inset-0 scan-line" />
```

---

## Animation Classes

- `.animate-fade-in` - Smooth entrance
- `.glitch` - Retro glitch effect
- `.card-hover` - Lift and glow on hover
- `.holographic` - Shifting color effect

---

Happy coding! Your SuppGames application will look absolutely stunning with this vaporwave aesthetic.
