<template>
  <v-app>
    <!-- Navigation bar -->
    <v-app-bar app color="white" elevate-on-scroll class="sticky-navbar">
      <v-app-bar-title class="text-h6 font-weight-bold">Losbücher</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        rounded
        elevation="2"
        @click="$router.push('/manuscript-viewer')"
      >
        Zur digitalen Edition
      </v-btn>
    </v-app-bar>

    <!-- Main content -->
    <v-main>
      <!-- Hero section -->
      <v-theme-provider dark>
        <section class="hero d-flex align-center justify-center" v-intersect="onIntersectHero">
          <v-container>
            <h1 class="text-h2 text-center font-weight-bold" :class="{ 'fade-in': heroVisible }">
              Losbücher im mittelalterlichen Aberglauben
            </h1>
          </v-container>
        </section>
      </v-theme-provider>

      <!-- Features section -->
      <section class="features py-16" v-intersect="onIntersectFeatures">
        <v-container>
          <v-row>
            <v-col v-for="(feature, index) in features" :key="index" cols="12" md="4">
              <v-card class="mx-auto" max-width="400" :class="{ 'slide-up': featuresVisible }">
                <v-card-title class="text-h5 font-weight-bold">{{ feature.title }}</v-card-title>
                <v-card-text>
                  <v-list>
                    <v-list-item v-for="(item, i) in feature.items" :key="i">
                      <v-list-item-content>
                        <v-list-item-title
                          v-if="item === 'Verwendung von Losmechanismen'"
                          @click="$router.push('/introduction')"
                          class="link"
                        >
                          {{ item }}
                        </v-list-item-title>
                        <v-list-item-title v-else>{{ item }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- Call to action section -->
      <v-theme-provider dark>
        <section class="cta d-flex align-center justify-center" v-intersect="onIntersectCta">
          <v-container class="text-center">
            <h2 class="text-h4 mb-6" :class="{ 'fade-in': ctaVisible }">
              Die digitale Edition ermöglicht es, direkt in die Welt der Losbücher einzutauchen
            </h2>
            <v-btn
              x-large
              color="secondary"
              rounded
              elevation="2"
              :class="{ 'fade-in': ctaVisible }"
              @click="$router.push('/manuscript-viewer')"
            >
              Zur digitalen Edition
            </v-btn>
          </v-container>
        </section>
      </v-theme-provider>
    </v-main>
  </v-app>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'LandingPage',
  setup() {
    const heroVisible = ref(false);
    const featuresVisible = ref(false);
    const ctaVisible = ref(false);

    const features = [
      {
        title: 'Arten von Losbüchern',
        items: ['Losbücher ohne Fragen', 'Losbücher mit Fragen', 'Astrologische Losbücher'],
      },
      {
        title: 'Besonderheiten',
        items: ['Diskontinuierliche Lektüre', 'Verwendung von Losmechanismen', 'Verbindung zur Astrologie'],
      },
      {
        title: 'Historischer Kontext',
        items: ['Ursprünge im 14. Jahrhundert', 'Verbreitung in Handschriften', 'Übergang zum Buchdruck'],
      },
    ];

    const onIntersectHero = (entries) => {
      if (entries.length > 0) {
        heroVisible.value = entries[0].isIntersecting;
      }
    };

    const onIntersectFeatures = (entries) => {
      if (entries.length > 0) {
        featuresVisible.value = entries[0].isIntersecting;
      }
    };

    const onIntersectCta = (entries) => {
      if (entries.length > 0) {
        ctaVisible.value = entries[0].isIntersecting;
      }
    };

    return {
      heroVisible,
      featuresVisible,
      ctaVisible,
      features,
      onIntersectHero,
      onIntersectFeatures,
      onIntersectCta,
    };
  },
};
</script>

<style scoped>
.sticky-navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
}

.hero {
  height: 100vh;
  background-image: url('../assets/images/landing_page.png');
  background-size: cover;
  background-position: center;
  color: white;
}

.features {
  background-color: #F5F5F5; /* Light grey */
}

.cta {
  height: 50vh;
  background-image: url('../assets/images/landing_page2.png');
  background-size: cover;
  color: white;
  background-position: center;
}

.link {
  cursor: pointer;
  color: blue;
  text-decoration: underline;
}

.fade-in {
  animation: fadeIn 1s ease-out;
}

.slide-up {
  animation: slideUp 0.8s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
</style>
