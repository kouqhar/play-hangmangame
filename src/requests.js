const getPuzzle = async wordCount => {
    const response = await fetch(`//puzzle.mead.io/puzzle?wordCount=${wordCount}`)

    if(response.status === 200){
        const data = await response.json()
        return data.puzzle
    }
    else throw new Error('An error has occurred generating a new word!!!')
}

const getCurrentLocation = async () => {
    const location = await getLocation()
    return getCountry(location.country)
}

const getCountry = async alphaCode => {
    const response = await fetch(`//restcountries.eu/rest/v2/all`)

    if(response.status === 200) {
        const data = await response.json()
        return data.find(country => country.alpha2Code === alphaCode)
    }
    else throw new Error('Unable to fetch country data')
}

const getLocation = async () => {
    const response = await fetch('//ipinfo.io/json?token=db10247e8bca3f')

    if(response.status === 200){
        return response.json()
    }else{
        throw new Error('Cannot get user location')
    }
}

export { getPuzzle as default }