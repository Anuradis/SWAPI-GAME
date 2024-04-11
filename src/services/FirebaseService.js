import { collection, getDocs } from 'firebase/firestore'
import GameResult from '@/models/GameResult'

export default {
  async fetchGameResults(db) {
    const docsSnapshot = await getDocs(collection(db, 'results'))
    return docsSnapshot.docs.map((doc) => GameResult.fromAPI(doc.data().game))
  }
}
