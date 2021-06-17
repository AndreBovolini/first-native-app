import React, { useEffect, useState } from 'react'
import fetchComAppDatasCarteiras from '../../../dados/conta/datasCarteiras';


function NewFilter() {
    const [selectedWallet, setSelectedWallet] = useState('');
    const [selectPeriod, setSelectPeriod] = useState(false);
    const [showError, setShowError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoadingDatas, setIsLoadingDatas] = useState(false);
    const [firstWalletDate, setFirstWalletDate] = useState('')
    const [lastWalletDate, setLastWalletDate] = useState('')
    const [firstSelectedDate, setFirstSelectedDate] = useState('')
    const [lastSelectedDate, setLastSelectedDate] = useState('')

    useEffect(() => {
        async function getWalletDates() {
         
            try {
                await fetchComAppDatasCarteiras().then(response => {
                    return {
                        inicio: response.data_mais_antiga,
                        final: response.data_mais_antiga
                    }
                })
            } catch {
                return 'error'
            }
    }

    if (selectPeriod && selectedWallet !== '') {
        let datas = getWalletDates()
        if (datas !== error) {
            setFirstWalletDate(datas.inicio);
            setFirstSelectedDate(datas.inicio);
            setLastWalletDate(datas.final);
            setLastSelectedDate(datas.final);
            setIsLoadingDatas(false)
        }
    }
    }, [selectPeriod])

    const handleSetecWallet = (name) => {
        setSelectedWallet(name)
    }

    const handleChangeSelectPeriod = () {
        setSelectPeriod(!selectPeriod)
        if (selectedWallet) {
            setIsLoadingDatas(true)
        }
    }

    const handleSelectFisrtDate = (date) => {
        if (date > firstWalletDate) {
            setFirstSelectedDate(date)
            showError(false)
        } else {
            handleShowError(`Escolha uma data posterior a ${firstWalletDate}`)
        }
    }

    const handleSelectLastDate = (date) => {
        if (date < firstWalletDate) {
            setFirstSelectedDate(date)
            showError(false)
        } else {
            handleShowError(`Escolha uma data anterior a ${lastWalletDate}`)
        }
    }

    function handleShowError(message) {
        setErrorMessage(message)
        showError(true)
      }

    return (
        <View>

        </View>
    )
}

export default NewFilter;
