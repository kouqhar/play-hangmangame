class Hangman {
    constructor(word, remainingGuesses) {
        this.word = word.toLowerCase().split('')
        this.remainingGuesses = remainingGuesses
        this.guessedLetters = []
        this.status = 'Playing'
    }
    get statusMessage(){
        let displayStatus = ''
        if(this.status === 'Playing') displayStatus = `Guesses Left : ${this.remainingGuesses}`
        else if(this.status === 'Finished') displayStatus = `Great Work! You guessed the word.`
        else if(this.status === 'Failed') displayStatus = `Nice try! The word was "${this.word.join('')}"`
        return displayStatus
    }
    calculatingStatus(){
        let myWord = this.word
        let myGuess = this.guessedLetters

        let finished = myWord.every(letter => myGuess.includes(letter) || letter === ' ')
        
        if(this.remainingGuesses <= 0 && (myGuess !== myWord)) this.status = 'Failed'
        else if(finished) this.status = 'Finished'
        
        if(this.remainingGuesses <= 0) this.remainingGuesses = 0
    }
    get puzzle() {
        let puzzle = ''

        this.word.forEach((letter) => {
            if (this.guessedLetters.includes(letter) || letter === ' ') puzzle += letter
            else puzzle += '*'
        })
        return puzzle
    }
    makeGuess(guess) {
        guess = guess.toLowerCase()
        const isUnique = !this.guessedLetters.includes(guess)
        const isBadGuess = !this.word.includes(guess)

        if(this.status !== 'Playing') return 
        if (isUnique) this.guessedLetters.push(guess)
        if (isUnique && isBadGuess) this.remainingGuesses--
        this.calculatingStatus()
    }
}

export { Hangman as default }