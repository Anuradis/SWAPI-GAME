import { collection, getDocs } from 'firebase/firestore'
import Game from '@/models/Game'

export default {
  async fetchGameResults(db) {
    const docsSnapshot = await getDocs(collection(db, 'results'))
    return docsSnapshot.docs.map((doc) => Game.fromAPI(doc.data().game))
  }
}
