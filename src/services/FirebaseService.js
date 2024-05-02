import { collection, getDocs, doc, setDoc } from 'firebase/firestore'
import { sortByScoreDifference } from '@/utils/common'
import GameResult from '@/models/GameResult'

export default {
  async fetchGameResults(db) {
    const docsSnapshot = await getDocs(collection(db, 'results'))
    const results = docsSnapshot.docs.map((doc) => GameResult.fromAPI(doc.data().game))
    return sortByScoreDifference(results)
  },

  async updateResultsCollection(db, gameResult) {
    await setDoc(doc(collection(db, 'results')), {
      game: gameResult
    })
  }
}
