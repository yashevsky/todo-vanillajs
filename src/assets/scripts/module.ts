type chainIdType = '250' | '56' | '1'

type initStateType = {
    isAppLoaded: boolean
    isFetching: boolean
    isModalOpened: boolean
    chainId: chainIdType
}

const initState: initStateType = {
    isAppLoaded: true,
    isFetching: true,
    isModalOpened: true,
    chainId: '250',
}

const arr = {
    prop1: 'some',
    prop2: 'some2',
    prop3: 3,
}
