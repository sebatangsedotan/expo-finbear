import ParallaxScrollView from '@/components/parallax-scroll-view'
import { ThemedText } from '@/components/themed-text'
import { Text, View } from 'react-native'

export default function DashboardScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#3fb5faff', dark: '#1D3D47' }}
      headerImage={
        <View className="bg-neutral-700 px-6 pt-24 pb-12">
          <Text className="text-xs tracking-wide text-neutral-400 uppercase">
            Today
          </Text>
          <Text className="mt-2 text-4xl font-semibold text-white">
            IDR 1.000.000
          </Text>
          <Text className="mt-1 text-sm text-neutral-400">
            Total transactions
          </Text>
          <View className="mt-8 rounded-2xl bg-white/5 px-4 py-4 backdrop-blur">
            <View className="flex flex-row items-center justify-between">
              <View>
                <Text className="text-xs text-neutral-400">Active account</Text>
                <Text className="mt-1 text-sm font-medium text-white">
                  Main Wallet
                </Text>
              </View>
              <Text className="text-sm text-neutral-300">Details →</Text>
            </View>
          </View>
        </View>
      }
    >
      <ThemedText type="title">Dashboard</ThemedText>
      <ThemedText>
        Welcome to FinBear! Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Velit ab nemo beatae est omnis sequi laboriosam numquam deleniti,
        eligendi sapiente delectus, minima quasi molestiae maiores. Mollitia
        quam quas dolore! Aliquam quod magnam nulla a cum eligendi atque, fuga
        nisi fugit placeat ad voluptas, iste perspiciatis assumenda mollitia
        explicabo dolore quis modi nemo commodi laborum. Tempora dolore nisi
        reiciendis repellendus quis ratione maxime debitis inventore, modi eum
        repellat possimus totam mollitia beatae magni quisquam dolor quaerat
        temporibus recusandae eaque? Exercitationem, ex voluptatem cumque
        pariatur aut ut eaque architecto rerum molestias cum esse amet obcaecati
        quibusdam. Facilis, iste perspiciatis! Quis vero ipsa quaerat ea fugit
        incidunt. Maiores, voluptatem odio. Magni necessitatibus voluptate saepe
        dolores culpa atque aspernatur, illum ut, fugiat doloremque eligendi
        nobis corrupti delectus vero aut ullam. Mollitia ducimus repellendus
        tenetur reprehenderit voluptas voluptates quae, sequi necessitatibus
        aspernatur? Provident dicta culpa quasi suscipit dolorem nesciunt a iure
        animi repudiandae omnis fugiat natus quis ratione deserunt vel neque
        aliquam minus soluta repellendus optio, ipsa est, autem, distinctio
        adipisci. Quas exercitationem veritatis blanditiis fugiat minus aliquam
        ab libero neque at impedit placeat omnis iste, odio sint dolorem sequi
        rerum! Unde natus, saepe, vero odit laudantium cupiditate laboriosam
        debitis in voluptatem velit, dolorem rem magni aut quas explicabo
        eveniet a facilis ipsam? Maxime maiores ratione neque blanditiis aliquid
        velit quae exercitationem dicta voluptatibus? Delectus, illum dolores
        minima officiis perferendis magnam! Ipsa perspiciatis, unde nemo officia
        quia enim minus, laudantium nisi odit omnis blanditiis cumque quibusdam
        deserunt deleniti ea corporis consequuntur totam minima aliquid! Ex
        nostrum, at atque quibusdam consequatur autem officiis dicta
        voluptatibus a temporibus. Perferendis amet cum possimus. Dolor cumque,
        accusantium tempora eum, ipsum, eveniet quisquam facilis sed sunt
        pariatur sequi? Tenetur quis facere deleniti, fuga architecto officia
        ipsam corporis quisquam distinctio consequatur voluptates necessitatibus
        asperiores nulla eos obcaecati ut perferendis ducimus, laboriosam magnam
        autem vel voluptatibus quasi reprehenderit illum! Praesentium, officiis.
        Vero iusto reiciendis deleniti omnis culpa vel atque beatae ea, minus
        accusantium, impedit repellat tenetur minima ipsa iure quo cupiditate
        facere odit qui ducimus recusandae excepturi eaque eum illum! Tempora
        laborum consectetur id quia nesciunt, quae debitis suscipit facere
        cupiditate iste dolorem, numquam sapiente nam eum aliquid, placeat
        molestias perspiciatis quam temporibus tenetur voluptas voluptates
        pariatur eveniet! Autem totam vel vitae laborum minus consequatur rem
        deserunt ipsa maxime omnis nemo, cum perferendis, consequuntur enim
        dignissimos voluptates, quas id necessitatibus facilis explicabo quis
        sapiente dicta qui alias. Labore nisi ad nobis quo? Sequi repellendus
        unde reiciendis sunt beatae a. Nisi aliquid, id vitae nostrum neque fuga
        explicabo, harum minus veniam assumenda cumque excepturi quod amet
        accusantium quae! Qui nulla fugiat quam est maiores cumque quidem
        voluptatibus voluptatum quod dolorum repellat iure aliquam officia
        obcaecati, aliquid corrupti quae saepe suscipit aut similique
        dignissimos? Corrupti expedita ad dolorem aspernatur ullam fuga
        repudiandae repellat in, sint harum consectetur veritatis distinctio
        animi obcaecati repellendus, placeat dicta laborum sequi totam suscipit
        laboriosam. Ex enim nostrum libero laboriosam corporis modi, voluptas
        molestias iusto quisquam. Animi saepe labore vel necessitatibus! Illo
        voluptatum dolor porro amet ratione! Rem, at facilis.
      </ThemedText>
    </ParallaxScrollView>
  )
}
