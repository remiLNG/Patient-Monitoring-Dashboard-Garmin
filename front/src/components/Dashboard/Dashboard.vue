<template>
  <v-app id="dashboard">
    <v-container>
      <v-flex>
        <NavDashboard
          v-bind:relative="relative"
          v-bind:events="events"
          :demarrage="demarrage"
          @update-demarrage="update"
          :key="key"
          @update-key="updateK"
        />
      </v-flex>
      <v-flex v-if="demarrage">
        <v-flex>
          <v-card class="text-center mt-0 mb-0">
            <v-card-title class="layout justify-center"
              >{{ relative.prenom }} {{ relative.nom }}</v-card-title
            >

            <!-- button copy a voir si on laisse-->
            <v-tooltip bottom>
              <template #activator="{ on }">
                <v-btn
                  color="primary"
                  @click="giveRelativeID"
                  v-on="on"
                  class="mr-5"
                >
                  <v-icon>mdi-content-copy</v-icon>
                </v-btn>
              </template>
              <span>Cliquez ici pour copier l'id de votre proche !</span>
            </v-tooltip>

            <v-dialog v-model="dialog2" max-width="380">
              <template v-slot:activator="{ on: dialog }">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on: tooltip }">
                    <v-btn
                      v-on="{ ...tooltip, ...dialog }"
                      color="success"
                      @click="shareRelative"
                    >
                      <v-icon> mdi-account-group</v-icon>
                    </v-btn>
                  </template>
                  <span>Découvrez qui partage ce proche.</span>
                </v-tooltip>
              </template>

              <v-card>
                <v-card-title class="justify-center blue--text">
                  Partagé par
                </v-card-title>
                <v-card-text class="text-center">
                  <li v-for="(item, index) in userList" :key="index">
                    {{ item }}
                  </li>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="dialog2 = false">
                    Ok
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog v-model="dialog4" max-width="500" class="dialogDoctor">
              <template v-slot:activator="{ on: dialog }">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on: tooltip }">
                    <v-btn
                      v-on="{ ...tooltip, ...dialog }"
                      color="teal"
                      dark
                      class="ml-5"
                      @click="getDoctors"
                    >
                      <v-icon> mdi-doctor</v-icon>
                    </v-btn>
                  </template>
                  <span>Consultez les médecins de votre proche.</span>
                </v-tooltip>
              </template>
              <v-card>
                <v-app-bar color="rgba(0,0,0,0)" flat>
                  <v-icon large class="mr-2" color="teal">mdi-doctor </v-icon>
                  <h3>Liste des médecins du proche</h3>
                  <v-spacer></v-spacer>
                </v-app-bar>
                <v-divider></v-divider>
                <v-list flat>
                  <v-list-item
                    v-for="doctor in listDoctors"
                    :key="doctor.text[0]"
                  >
                    <v-list-item-action>
                      <v-icon>{{ doctor.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <span>
                        Docteur. {{ doctor.text[0] }} {{ doctor.text[1] }}
                      </span>
                      <br />
                      <span> Spécialité : {{ doctor.text[3] }}</span> <br />
                      <span> Téléphone : {{ doctor.text[2] }}</span>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
                <PopupDoctors
                  v-bind:listDoctors="listDoctors"
                  v-bind:relative="relative"
                />
                <v-card-title class="justify-center">
                  <v-btn @click="goToDoctolib">
                    Prendre rendez-vous
                  </v-btn>
                </v-card-title>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="dialog4 = false">
                    Ok
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog v-model="dialog3" max-width="380">
              <template v-slot:activator="{ on: dialog }">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on: tooltip }">
                    <v-btn
                      v-on="{ ...tooltip, ...dialog }"
                      color="error"
                      class="ml-5"
                    >
                      <v-icon> mdi-delete-outline</v-icon>
                    </v-btn>
                  </template>
                  <span>Cliquez ici pour supprimer ce proche !</span>
                </v-tooltip>
              </template>

              <v-card>
                <v-card-title class="justify-center">
                  Etes vous sur de vouloir supprimer ce proche ?
                </v-card-title>
                <v-card-actions>
                  <v-btn color="error" text @click="dialog3 = false">
                    Non
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="deleteRelatve">
                    Oui
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-list>
              <v-list-item class="mt-4">
                <v-list-item-title class="teal--text"
                  >Age : {{ relative.age }}</v-list-item-title
                >
                <v-list-item-title class="teal--text"
                  >Sexe : {{ relative.sexe }}</v-list-item-title
                >
                <v-list-item-title class="teal--text"
                  >Taille : {{ relative.taille }} cm</v-list-item-title
                >
                <v-list-item-title class="teal--text"
                  >Poids : {{ relative.poids }} kg</v-list-item-title
                >
              </v-list-item>
            </v-list>
          </v-card>
        </v-flex>
        <v-flex>
          <v-row cols="12">
            <v-col sm="12" md="6" lg="4">
              <v-card v-if="relative.sleep[0] != undefined">
                <v-img
                  height="220"
                  src="https://i.ibb.co/TcFp2KK/depositphotos-277879810-stock-photo-front-view-active-senior-caucasian.jpg"
                ></v-img>
                <v-app-bar color="rgba(0,0,0,0)" flat class="mt-2">
                  <v-icon large class="mr-2" color="indigo"
                    >mdi-weather-night
                  </v-icon>
                  <h3>Temps de sommeil</h3>
                  <v-spacer></v-spacer>
                  <v-chip-group
                    v-model="selection2"
                    active-class="teal accent-4 white--text"
                    class="ma-8"
                    mandatory
                  >
                    <v-chip>Aujourd'hui</v-chip>
                  </v-chip-group>
                </v-app-bar>
                <v-card-text>
                  Durée du sommeil :
                  <b>{{ dataConverted[this.key][0] }} </b>
                  Heures
                  <br />
                  Heure de début :
                  <b
                    >{{ dataConverted[this.key][1] }}:
                    {{ dataConverted[this.key][2] }}:
                    {{ dataConverted[this.key][3] }}</b
                  >
                  <br />
                  Heure de fin :
                  <b
                    >{{ dataConverted[this.key][4] }}:
                    {{ dataConverted[this.key][5] }}:
                    {{ dataConverted[this.key][6] }}
                  </b>
                </v-card-text>
                <v-divider></v-divider>
                <v-app-bar color="rgba(0,0,0,0)" flat>
                  <v-icon large class="mr-2" color="amber">mdi-trophy </v-icon>
                  <h3>Score du sommeil</h3>
                </v-app-bar>
                <v-card-text>
                  Durée totale :
                  <b>{{
                    translate(
                      relative.sleep[0][relative.sleep[0].length - 1]
                        .sleepScores.totalDuration.qualifierKey
                    )
                  }}</b>
                  <br />
                  Stress :
                  <b>{{
                    translate(
                      relative.sleep[0][relative.sleep[0].length - 1]
                        .sleepScores.stress.qualifierKey
                    )
                  }}</b>
                  <br />
                  Agitation :
                  <b>{{
                    translate(
                      relative.sleep[0][relative.sleep[0].length - 1]
                        .sleepScores.restlessness.qualifierKey
                    )
                  }}</b>
                  <br />
                  Nombre d'éveil :
                  <b>{{
                    translate(
                      relative.sleep[0][relative.sleep[0].length - 1]
                        .sleepScores.awakeCount.qualifierKey
                    )
                  }}</b>
                  <br />
                  <br />
                  <v-icon medium color="yellow">mdi-star </v-icon>
                  Score global du sommeil :
                  <b>{{
                    translate(
                      relative.sleep[0][relative.sleep[0].length - 1]
                        .overallSleepScore.qualifierKey
                    )
                  }}</b>
                </v-card-text>
                <v-divider></v-divider>
                <v-expansion-panels class="mb-6">
                  <v-expansion-panel>
                    <v-expansion-panel-header disable-icon-rotate>
                      Informations
                      <template v-slot:actions>
                        <v-icon color="teal"> mdi-information </v-icon>
                      </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      Les adolescents (14-17 ans) ont besoin de dormir 8 à 10
                      heures par nuit. Les adultes (26-64 ans), entre 7 et 9
                      heures et les personnes âgées de 65 ans et plus affichent
                      pour leur part des besoins quelque peu plus élevés: de 7 à
                      8 heures de sommeil journalières sont préconisées par les
                      chercheurs.
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-card>
              <v-card v-if="relative.sleep[0] == undefined">
                <v-card-title class="mt-8">
                  Les données n'ont pas encore été récupérées</v-card-title
                >
              </v-card>
            </v-col>
            <v-col sm="12" md="6" lg="4">
              <v-card v-if="relative.dailies[0] != undefined">
                <v-img
                  height="220"
                  src="https://i.ibb.co/6Y7HL9p/650x350-do-you-know-the-benefits-of-walking-rmq.webp"
                ></v-img>
                <v-app-bar color="rgba(0,0,0,0)" flat class="mt-2">
                  <v-icon large class="mr-2" color="brown"
                    >mdi-shoe-print
                  </v-icon>
                  <h3>Nombre de pas</h3>
                  <v-spacer></v-spacer>
                  <v-chip-group
                    v-model="selection4"
                    active-class="teal accent-4 white--text"
                    class="ma-8"
                    mandatory
                  >
                    <v-chip @click="PasToday()">Aujourd'hui</v-chip>
                    <v-chip @click="PasWeek()">Semaine</v-chip>
                  </v-chip-group>
                </v-app-bar>
                <v-card-text>
                  Pas éffectués :
                  <b v-if="today1">{{
                    relative.dailies[0][relative.dailies[0].length - 1].steps
                  }}</b>
                  <b v-if="today1 == false">{{ this.today1Table[0] }}</b>
                  Pas <br />
                  <br />
                  <v-icon medium color="error">mdi-bullseye-arrow </v-icon>
                  Objectif :
                  <b v-if="today1">{{
                    relative.dailies[0][relative.dailies[0].length - 1]
                      .stepsGoal
                  }}</b>
                  <b v-if="today1 == false">{{ this.today1Table[1] }}</b>
                  Pas
                  <!-- <span class="colorT"> pour colorPas qui doit etre appellé au bon moment mais j'y arrive pas putain
                     faut l'appeler quand relative n'est pas null comme moi   red--text au lieu de error dans colorPas-->
                </v-card-text>
                <v-divider></v-divider>
                <v-app-bar color="rgba(0,0,0,0)" flat>
                  <v-icon large class="mr-2" color="blue-grey"
                    >mdi-map-marker-distance
                  </v-icon>
                  <h3>Distance parcourue</h3>
                </v-app-bar>
                <v-card-text>
                  Distance effectuée :
                  <b v-if="today1">{{
                    relative.dailies[0][relative.dailies[0].length - 1]
                      .distanceInMeters
                  }}</b>
                  <b v-if="today1 == false">{{ this.today1Table[2] }}</b>
                  mètres
                </v-card-text>
                <v-divider></v-divider>
                <v-app-bar color="rgba(0,0,0,0)" flat>
                  <v-icon large class="mr-2">mdi-stairs-up </v-icon>
                  <h3>Etages montés</h3>
                </v-app-bar>
                <v-card-text>
                  Etages montés :
                  <b v-if="today1">{{
                    relative.dailies[0][relative.dailies[0].length - 1]
                      .floorsClimbed
                  }}</b>
                  <b v-if="today1 == false">{{ this.today1Table[3] }}</b>
                  étages<br />
                  <br />
                  <v-icon medium color="error">mdi-bullseye-arrow </v-icon>
                  Objectif :
                  <b v-if="today1">{{
                    relative.dailies[0][relative.dailies[0].length - 1]
                      .floorsClimbedGoal
                  }}</b>
                  <b v-if="today1 == false">{{ this.today1Table[4] }}</b>
                  étages
                </v-card-text>
                <v-divider></v-divider>
                <v-expansion-panels class="mb-6">
                  <v-expansion-panel>
                    <v-expansion-panel-header disable-icon-rotate>
                      Informations
                      <template v-slot:actions>
                        <v-icon color="teal"> mdi-information </v-icon>
                      </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      L'OMS recommande aux personnes adultes de marcher
                      l'équivalent de 10.000 pas par jour, ce qui équivaut à une
                      durée de marche quotidienne de 100 minutes environ pour
                      une distance de 8 km. Après 60 ans, on estime qu'une heure
                      de marche quotidienne permet de maintenir une bonne
                      condition physique. Le minimum de pas recommandés se monte
                      à environ 4.400, soit entre 2,5 et 3 km de marche au
                      total. Idéalement, les seniors sont encouragés à marcher
                      entre 4.400 et 7.500 pas par jour.
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-card>
              <v-card v-if="relative.dailies[0] == undefined">
                <v-card-title class="mt-8">
                  Les données n'ont pas encore été récupérées</v-card-title
                >
              </v-card>
            </v-col>
            <v-col sm="12" md="6" lg="4">
              <v-card>
                <v-app-bar color="rgba(0,0,0,0)" flat>
                  <v-icon large class="mr-2" color="teal">mdi-calendar</v-icon>
                  <h3>Calendrier du proche</h3>
                  <v-spacer></v-spacer>
                </v-app-bar>
                <v-divider></v-divider>
                <v-sheet height="530">
                  <v-calendar
                    ref="calendar"
                    v-model="focus"
                    :events="events"
                    :event-color="getEventColor"
                    :type="type"
                    max-height="200"
                    first-interval="6"
                    interval-count="13"
                  ></v-calendar>
                </v-sheet>
                <CalendarDashboard
                  v-bind:relative="relative"
                  v-bind:events="events"
                >
                </CalendarDashboard>
              </v-card>
            </v-col>
          </v-row>
          <v-row cols="12">
            <v-col sm="12" md="6" lg="4">
              <v-card v-if="relative.dailies[0] != undefined">
                <v-img
                  height="150"
                  src="https://i.ibb.co/Jmh5dHc/rythme-cardiaque-quand-faut-consulter.jpg"
                ></v-img>
                <v-app-bar color="rgba(0,0,0,0)" flat class="mt-2">
                  <v-icon large class="mr-2" color="error"
                    >mdi-heart-pulse
                  </v-icon>
                  <h3>Rythme cardiaque</h3>
                  <v-spacer></v-spacer>
                  <v-chip-group
                    v-model="selection"
                    active-class="teal accent-4 white--text"
                    class="ma-8"
                    mandatory
                  >
                    <v-chip @click="BPMtoday()">Aujourd'hui</v-chip>

                    <v-chip @click="BPMweek()">Semaine</v-chip>
                  </v-chip-group>
                </v-app-bar>

                <v-card-text>
                  Fréquence cardiaque minimale :
                  <b v-if="today2">{{
                    relative.dailies[0][relative.dailies[0].length - 1]
                      .minHeartRateInBeatsPerMinute
                  }}</b>
                  <b v-if="today2 == false">{{ this.today2Table[0] }}</b>
                  BPM <br />
                  Fréquence cardiaque maximale :
                  <b v-if="today2">{{
                    relative.dailies[0][relative.dailies[0].length - 1]
                      .maxHeartRateInBeatsPerMinute
                  }}</b>
                  <b v-if="today2 == false">{{ this.today2Table[1] }}</b>
                  BPM <br />
                  Fréquence cardiaque moyenne :
                  <b v-if="today2">{{
                    relative.dailies[0][relative.dailies[0].length - 1]
                      .averageHeartRateInBeatsPerMinute
                  }}</b>
                  <b v-if="today2 == false">{{ this.today2Table[2] }}</b>
                  BPM <br />
                  Fréquence cardiaque au repos :
                  <b v-if="today2">{{
                    relative.dailies[0][relative.dailies[0].length - 1]
                      .restingHeartRateInBeatsPerMinute
                  }}</b>
                  <b v-if="today2 == false">{{ this.today2Table[3] }}</b>
                  BPM <br />
                </v-card-text>
                <v-expansion-panels class="mb-6">
                  <v-expansion-panel>
                    <v-expansion-panel-header disable-icon-rotate>
                      Informations
                      <template v-slot:actions>
                        <v-icon color="teal"> mdi-information </v-icon>
                      </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      La fréquence cardiaque au repos varie selon l'âge :
                      <ul>
                        <li>adolescent ou adulte : 70 ± 10</li>
                        <li>personne âgée : 65 ± 5</li>
                      </ul>
                      Chez l'adulte en bonne santé, au repos, la fréquence
                      cardiaque se situe entre 50 (sportif pratiquant
                      l'endurance) et 80 pulsations par minute. Pendant un
                      effort, la fréquence cardiaque maximale théorique est de
                      220 moins l'âge (exemple : 220 - 40 ans = 180).
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-card>
              <v-card v-if="relative.dailies[0] == undefined">
                <v-card-title class="mt-8">
                  Les données n'ont pas encore été récupérées</v-card-title
                >
              </v-card>
            </v-col>
            <v-col sm="12" md="6" lg="4">
              <v-card v-if="relative.dailies[0] != undefined">
                <v-img
                  height="150"
                  src="https://i.ibb.co/DpwD38v/Calories-1200x628-1200x610.jpg"
                ></v-img>
                <v-app-bar color="rgba(0,0,0,0)" flat class="mt-2">
                  <v-icon large class="mr-2" color="deep-orange"
                    >mdi-fire</v-icon
                  >
                  <h3>Calories</h3>
                  <v-spacer></v-spacer>
                  <v-chip-group
                    v-model="selection5"
                    active-class="teal accent-4 white--text"
                    class="ma-8"
                    mandatory
                  >
                    <v-chip @click="CalToday()">Aujourd'hui</v-chip>

                    <v-chip @click="CalWeek()">Semaine</v-chip>
                  </v-chip-group>
                </v-app-bar>
                <v-card-text>
                  Calories actives :
                  <b v-if="today3">{{
                    relative.dailies[0][relative.dailies[0].length - 1]
                      .activeKilocalories
                  }}</b>
                  <b v-if="today3 == false">{{ this.today3Table[0] }}</b>
                  <br />
                  BMR Kilocalories :
                  <b v-if="today3">{{
                    relative.dailies[0][relative.dailies[0].length - 1]
                      .bmrKilocalories
                  }}</b>
                  <b v-if="today3 == false">{{ this.today3Table[1] }}</b>
                  <br />
                  Activité :
                  <b v-if="today3">{{
                    translate(
                      relative.dailies[0][relative.dailies[0].length - 1]
                        .activityType
                    )
                  }}</b>
                  <b v-if="today3 == false">{{ this.today3Table[2] }}</b>
                  <br />
                  <br />
                  <v-icon medium color="error">mdi-bullseye-arrow </v-icon>
                  Objectif :
                  <b v-if="today3">{{
                    relative.dailies[0][relative.dailies[0].length - 1]
                      .netKilocaloriesGoal
                  }}</b>
                  <b v-if="today3 == false">{{ this.today3Table[3] }}</b>
                  <br />
                </v-card-text>
                <v-expansion-panels class="mb-6">
                  <v-expansion-panel>
                    <v-expansion-panel-header disable-icon-rotate>
                      Informations
                      <template v-slot:actions>
                        <v-icon color="teal"> mdi-information </v-icon>
                      </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <h4>Qu’est-ce que le BMR ?</h4>
                      C'est le nombre de calories nécessaires au fonctionnement
                      de votre corps au repos. Plus votre BMR est élevé, plus
                      vous brûlez de calories, simplement en étant vivant.<br />
                      Pour homme adulte, la valeur normale du BMR se trouve
                      entre 34 et 37 kcal/centimètre carré/heure.<br />
                      Pour une femme adulte, la valeur normale du BMR se trouve
                      entre 30 et 35 kcal/centimètre carré/heure.<br />
                      Pour facilité les calculs, le BMR d'un adulte est fixé à
                      24 kcal/kg poid du corps / jour<br />
                      <h4>Calorie active</h4>
                      Ce sont les calories que vous brûlez lors d’une activité
                      physique, non-sédentaire.
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-card>
              <v-card v-if="relative.dailies[0] == undefined">
                <v-card-title class="mt-8">
                  Les données n'ont pas encore été récupérées</v-card-title
                >
              </v-card>
            </v-col>
            <v-col sm="12" md="6" lg="4">
              <v-card v-if="relative.dailies[0] != undefined">
                <v-img
                  height="150"
                  src="https://i.ibb.co/Fx4Dzmv/10204e2cf94ed01b71805a97cdf1047b.jpg"
                ></v-img>
                <v-app-bar color="rgba(0,0,0,0)" flat class="mt-2">
                  <v-icon large class="mr-2" color="green"
                    >mdi-flash-alert-outline</v-icon
                  >
                  <h3>Stress</h3>
                  <v-spacer></v-spacer>
                  <v-chip-group
                    v-model="selection6"
                    active-class="teal accent-4 white--text"
                    class="ma-8"
                    mandatory
                  >
                    <v-chip @click="StressToday()">Aujourd'hui</v-chip>

                    <v-chip @click="StressWeek()">Semaine</v-chip>
                  </v-chip-group>
                </v-app-bar>
                <v-card-text>
                  Niveau de stress moyen :
                  <b v-if="today4">
                    {{
                      relative.dailies[0][relative.dailies[0].length - 1]
                        .averageStressLevel
                    }}
                  </b>
                  <b v-if="today4 == false">{{ this.today4Table[0] }}</b>
                  <br />
                  Niveau de stress maximal :
                  <b v-if="today4">
                    {{
                      relative.dailies[0][relative.dailies[0].length - 1]
                        .maxStressLevel
                    }}
                  </b>
                  <b v-if="today4 == false">{{ this.today4Table[1] }}</b>
                  <br />
                  Heure de début :
                  <b v-if="today4"
                    >{{ dataConverted[this.key][7] }}:{{
                      dataConverted[this.key][8]
                    }}:{{ dataConverted[this.key][9] }}
                  </b>
                  <b v-if="today4 == false">--</b>
                  <br />
                  Heure de fin :
                  <b v-if="today4"
                    >{{ dataConverted[this.key][10] }}:
                    {{ dataConverted[this.key][11] }}:
                    {{ dataConverted[this.key][12] }}
                  </b>
                  <b v-if="today4 == false">--</b>
                  <br />
                  Durée du stress :
                  <b v-if="today4">
                    {{
                      relative.stress[0][relative.stress[0].length - 1]
                        .durationInSeconds
                    }}
                    secondes
                  </b>
                  <b v-if="today4 == false"
                    >{{ this.today4Table[2] }} secondes</b
                  >
                  <br />
                </v-card-text>
                <v-expansion-panels class="mb-6">
                  <v-expansion-panel>
                    <v-expansion-panel-header disable-icon-rotate>
                      Informations
                      <template v-slot:actions>
                        <v-icon color="teal"> mdi-information </v-icon>
                      </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <h4>Score inférieur à 21</h4>
                      C’est une personne qui sait gérer son stress, qui sait
                      s’adapter et pour laquelle il existe toujours des
                      solutions. <br />
                      <h4>Score compris entre 21 et 26</h4>
                      C’est une personne qui sait en général faire face au
                      stress, mais il existe un certain nombres de situations
                      qu’elle ne sait pas gérer. Elle est parfois animée d’un
                      sentiment d’impuissance qui entraînent des perturbations
                      émotionnelles. <br />
                      <h4>Score supérieur à 27</h4>
                      La vie est une menace perpétuelle pour cette personne :
                      elle a le sentiment de subir la plupart des situations et
                      de ne pouvoir rien faire d’autre que de les subir. Ce fort
                      sentiment d’impuissance lié à sa représentation de la vie
                      peut la faire basculer dans la maladie.
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-card>
              <v-card v-if="relative.dailies[0] == undefined">
                <v-card-title class="mt-8">
                  Les données n'ont pas encore été récupérées</v-card-title
                >
              </v-card>
            </v-col>
          </v-row>
        </v-flex>
      </v-flex>
    </v-container>
  </v-app>
</template>

<script>
import NavDashboard from "./NavDashboard.vue";
import PopupDoctors from "../Doctors/PopupDoctors.vue";
import CalendarDashboard from "./CalendarDashboard.vue";

export default {
  data: () => ({
    //colorT: '',
    dataConverted: [],
    tempData: [],
    drawer: true,
    selection: 0,
    selection2: 0,
    selection3: 0,
    selection4: 0,
    selection5: 0,
    selection6: 0,
    demarrage: false,
    key: null,
    dialog: false,
    dialog2: false,
    dialog3: false,
    dialog4: false,
    relative: {
      prenom: "",
      nom: "",
      age: "",
      sexe: "",
      poids: "",
      taille: "",
      stress: "",
      sleep: "",
      activities: "",
      dailies: "",
      id: "",
    },
    relativeID: "",
    userList: [],
    listDoctors: [],
    focus: "",
    type: "day",
    today1: true,
    today1Table: [],
    today2: true,
    today2Table: [],
    today3: true,
    today3Table: [],
    today4: true,
    today4Table: [],
    events: [],
  }),
  methods: {
    BPMtoday: function() {
      this.today2 = true;
    },
    getEventColor(event) {
      return event.color;
    },
    BPMweek: function() {
      this.today2 = false;
      if (this.relative.dailies[0].length >= 7) {
        let res1 = 0;
        let res2 = 0;
        let res3 = 0;
        let res4 = 0;
        let test = this.relative.dailies[0].length - 7;
        for (let index = 0; index < this.relative.dailies[0].length; index++) {
          res1 += this.relative.dailies[0][test + index]
            .minHeartRateInBeatsPerMinute;
        }
        this.today2Table.push((res1 / 7).toFixed(0));
        for (let index = 0; index < this.relative.dailies[0].length; index++) {
          if (
            res2 <
            this.relative.dailies[0][test + index].maxHeartRateInBeatsPerMinute
          )
            res2 = this.relative.dailies[0][test + index]
              .maxHeartRateInBeatsPerMinute;
        }
        this.today2Table.push(res2);
        for (let index = 0; index < this.relative.dailies[0].length; index++) {
          res3 += this.relative.dailies[0][test + index]
            .averageHeartRateInBeatsPerMinute;
        }
        this.today2Table.push((res3 / 7).toFixed(0));
        for (let index = 0; index < this.relative.dailies[0].length; index++) {
          res4 += this.relative.dailies[0][test + index]
            .restingHeartRateInBeatsPerMinute;
        }
        this.today2Table.push((res4 / 7).toFixed(0));
      } else {
        for (let index = 0; index < 5; index++) {
          this.today2Table.push("--");
        }
      }
    },
    PasWeek: function() {
      this.today1 = false;
      if (this.relative.dailies[0].length >= 7) {
        let res1 = 0;
        let res2 = 0;
        let res3 = 0;
        let res4 = 0;
        let res5 = 0;
        let test = this.relative.dailies[0].length - 7;
        for (let index = 0; index < this.relative.dailies[0].length; index++) {
          res1 += this.relative.dailies[0][test + index].steps;
        }
        this.today1Table.push(res1);
        for (let index = 0; index < this.relative.dailies[0].length; index++) {
          res2 += this.relative.dailies[0][test + index].stepsGoal;
        }
        this.today1Table.push(res2);
        for (let index = 0; index < this.relative.dailies[0].length; index++) {
          res3 += this.relative.dailies[0][test + index].distanceInMeters;
        }
        this.today1Table.push(res3);
        for (let index = 0; index < this.relative.dailies[0].length; index++) {
          res4 += this.relative.dailies[0][test + index].floorsClimbed;
        }
        this.today1Table.push(res4);
        for (let index = 0; index < this.relative.dailies[0].length; index++) {
          res5 += this.relative.dailies[0][test + index].floorsClimbedGoal;
        }
        this.today1Table.push(res5);
      } else {
        for (let index = 0; index < 5; index++) {
          this.today1Table.push("--");
        }
      }
    },
    PasToday: function() {
      this.today1 = true;
    },
    CalToday: function() {
      this.today3 = true;
    },
    CalWeek: function() {
      this.today3 = false;
      if (this.relative.dailies[0].length >= 7) {
        let res1 = 0;
        let res2 = 0;
        let res3 = "";
        let res4 = 0;
        let test = this.relative.dailies[0].length - 7;
        for (let index = 0; index < this.relative.dailies[0].length; index++) {
          res1 += this.relative.dailies[0][test + index].activeKilocalories;
        }
        this.today3Table.push((res1 / 7).toFixed(0));
        for (let index = 0; index < this.relative.dailies[0].length; index++) {
          res2 += this.relative.dailies[0][test + index].bmrKilocalories;
        }
        this.today3Table.push((res2 / 7).toFixed(0));
        res3 = "Varié";
        this.today3Table.push(res3);
        for (let index = 0; index < this.relative.dailies[0].length; index++) {
          res4 += this.relative.dailies[0][test + index].netKilocaloriesGoal;
        }
        this.today3Table.push((res4 / 7).toFixed(0));
      } else {
        for (let index = 0; index < 5; index++) {
          this.today3Table.push("--");
        }
      }
    },
    StressToday: function() {
      this.today4 = true;
    },
    StressWeek: function() {
      this.today4 = false;
      if (this.relative.dailies[0].length >= 7) {
        let res1 = 0;
        let res2 = 0;
        let res3 = 0;
        let test = this.relative.dailies[0].length - 7;
        for (let index = 0; index < this.relative.dailies[0].length; index++) {
          res1 += this.relative.dailies[0][test + index].averageStressLevel;
        }
        this.today4Table.push((res1 / 7).toFixed(0));
        for (let index = 0; index < this.relative.dailies[0].length; index++) {
          if (res2 < this.relative.dailies[0][test + index].maxStressLevel) {
            res2 = this.relative.dailies[0][test + index].maxStressLevel;
          }
        }
        this.today4Table.push(res2);
        for (let index = 0; index < this.relative.dailies[0].length; index++) {
          res3 += this.relative.stress[0][test + index].durationInSeconds;
        }
        this.today4Table.push((res3 / 7).toFixed(0));
      } else {
        for (let index = 0; index < 5; index++) {
          this.today4Table.push("--");
        }
      }
    },
    translate: function(val) {
      switch (val) {
        case "EXCELLENT":
          return "Excellent";

        case "GOOD":
          return "Bon";

        case "FAIR":
          return "Convenable";

        case "POOR":
          return "Mauvais";

        case "WALKING":
          return "Marche";

        default:
          break;
      }
    },
    update(demarrage) {
      this.demarrage = demarrage;
    },
    updateK(key) {
      this.key = key;
      this.today1Table = [];
      this.today2Table = [];
      this.today3Table = [];
      this.today4Table = [];
      this.events = [];
      this.getEvents();
    },
    giveRelativeID: async function() {
      let url = `https://ter-garmin.herokuapp.com/api/users/${localStorage.email}`;
      await fetch(url)
        .then((responseJSON) => {
          responseJSON.json().then((user) => {
            user.relatives.forEach((rel) => {
              if (this.relative.prenom == rel.firstname) {
                this.relativeID = rel._id;
                this.doCopy();
              }
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    shareRelative: async function() {
      let url = `https://ter-garmin.herokuapp.com/api/users/getAll`;
      await fetch(url)
        .then((responseJSON) => {
          responseJSON.json().then((user) => {
            if (this.userList.length == 0) {
              user.forEach((rel) => {
                rel.relatives.forEach((r) => {
                  if (r.firstname == this.relative.prenom) {
                    this.userList.push(rel.firstname + " " + rel.lastname);
                  }
                });
              });
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    doCopy: function() {
      this.$copyText(this.relativeID).then(
        function(e) {
          alert("Copie reussi");
          console.log(e);
        },
        function(e) {
          alert("echec de la copie");
          console.log(e);
        }
      );
    },
    deleteRelatve: async function() {
      this.dialog3 = false;
      let url = `https://ter-garmin.herokuapp.com/api/users/deleteRelative`;
      await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: localStorage.email,
          id: this.relative.id,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      location.reload();
    },
    convertData: async function() {
      let url = `https://ter-garmin.herokuapp.com/api/users/${localStorage.email}`;
      await fetch(url)
        .then((responseJSON) => {
          responseJSON.json().then((user) => {
            user.relatives.forEach((rel) => {
              let lastDataS = rel.sleep[0].length - 1;
              let lastDataSt = rel.stress[0].length - 1;
              let data1 = rel.sleep[0][0].durationInSeconds;
              data1 = data1 / 3600;
              this.tempData.push(data1.toFixed(0));

              let debutSommeil = new Date(
                rel.sleep[0][lastDataS].startTimeInSeconds * 1000 +
                  rel.sleep[0][lastDataS].startTimeOffsetInSeconds * 1000
              );
              let finalSommeil = new Date(
                rel.sleep[0][lastDataS].startTimeInSeconds * 1000 +
                  rel.sleep[0][lastDataS].startTimeOffsetInSeconds * 1000 +
                  rel.sleep[0][lastDataS].durationInSeconds * 1000
              );

              this.tempData.push(
                debutSommeil.getHours(),
                debutSommeil.getMinutes(),
                debutSommeil.getSeconds()
              );
              this.tempData.push(
                finalSommeil.getHours(),
                finalSommeil.getMinutes(),
                finalSommeil.getSeconds()
              );

              let debutStress = new Date(
                rel.stress[0][lastDataSt].startTimeInSeconds * 1000 +
                  rel.stress[0][lastDataSt].startTimeOffsetInSeconds * 1000
              );

              let finalStress = new Date(
                rel.stress[0][lastDataSt].startTimeInSeconds * 1000 +
                  rel.stress[0][lastDataSt].startTimeOffsetInSeconds * 1000 +
                  rel.stress[0][lastDataSt].durationInSeconds * 1000
              );

              this.tempData.push(
                debutStress.getHours(),
                debutStress.getMinutes(),
                debutStress.getSeconds()
              );
              this.tempData.push(
                finalStress.getHours(),
                finalStress.getMinutes(),
                finalStress.getSeconds()
              );

              this.dataConverted.push(this.tempData);
              this.tempData = [];
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    goToDoctolib: function() {
      location.href = "https://www.doctolib.fr/";
    },
    getDoctors: async function() {
      this.listDoctors = [];
      let url2 = `https://ter-garmin.herokuapp.com/api/users/${localStorage.email}`;
      await fetch(url2)
        .then((responseJSON) => {
          responseJSON.json().then((user) => {
            user.relatives.forEach((rel) => {
              rel.doctors.forEach((r) => {
                if (
                  this.relative.prenom == rel.firstname &&
                  this.relative.nom == rel.lastname
                ) {
                  let newDoctor = {
                    icon: "mdi-doctor",
                    text: [r.firstname, r.lastname, r.phone, r.specialities],
                  };
                  this.listDoctors.push(newDoctor);
                }
              });
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getEvents: async function() {
      let url2 = `https://ter-garmin.herokuapp.com/api/users/${localStorage.email}`;
      await fetch(url2)
        .then((responseJSON) => {
          responseJSON.json().then((user) => {
            user.relatives.forEach((rel) => {
              if (
                this.relative.prenom == rel.firstname &&
                this.relative.nom == rel.lastname
              ) {
                if(rel.events != null){
                rel.events.forEach((e) => {
                  let goodStartDate = e.startEvent.replace("T", " ");
                  goodStartDate = goodStartDate.substring(0, 19);

                  let goodEndDate = e.endEvent.replace("T", " ");
                  goodEndDate = goodEndDate.substring(0, 19);

                  let newEvent = {
                    name: e.nameEvent,
                    start: goodStartDate,
                    end: goodEndDate,
                    color: e.color,
                  };

                  this.events.push(newEvent);
                });
                }
              }
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  mounted() {
    this.convertData();
    console.log(this.dataConverted);
    // this.$refs.calendar.checkChange();
  },
  props: {
    doctors: {
      type: Object,
    },
  },
  components: {
    NavDashboard,
    PopupDoctors,
    CalendarDashboard,
  },
  watch: {
    dialog2: function(val) {
      if (val == false) {
        const longeur = this.userList.length;
        for (let i = 0; i < longeur; i++) {
          this.userList.pop();
        }
      }
    },
  },
};
</script>

<style scoped>
#dashboard {
  background-color: #add8e6;
}

.v-dialog,
.dialogDoctor {
  overflow-y: hidden !important;
}
</style>
