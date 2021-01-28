import React, { useContext, useEffect, useState } from 'react'

import { GlobalContext } from '../../../App'
import Card from './Card'
import Header from '../../header/Header'
import Loading from '../../Loading'
import Sidebar from '../../Sidebar'
import './CardLibrary.scss'
import AllCardsIcon from '../../../assets/svg/sticker-style/layer.svg'
import QuestionIcon from '../../../assets/svg/sticker-style/question.svg'
import ViewCardsIcon from '../../../assets/svg/sketch-style/018-layers.svg'

export default function CardLibrary () {
	const context = useContext(GlobalContext)
	const { state, dispatch } = context
	const [ visibleCards, setVisibleCards ] = useState([])
	const [ isLoading, setIsLoading ] = useState(true)

	useEffect(() => {
		setVisibleCards(state.cards)
		setIsLoading(false)
	}, [state.cards])

	const showAllCards = () => {
		if (visibleCards.length !== state.cards.length) {
			setVisibleCards(state.cards)
			dispatch({
				type: 'SET_MESSAGE',
				payload: {
					message: 'All cards now visible.'
				}
			})
		} else {
			dispatch({
				type: 'SET_MESSAGE',
				payload: {
					message: 'All available cards are already displayed.'
				}
			})
		}		
	}

	const showQuestionOnlyCards = async () => {
		const currentList = [...visibleCards]
		let cardsList = await currentList.filter(card => card.answer === '' && card.question !== '')
			
		if (cardsList.length === 0) {
			dispatch({
				type: 'SET_MESSAGE',
				payload: {
					message: 'You have no unanswered questions.'
				}
			})
		} else {
			console.log(cardsList)
			setVisibleCards(cardsList)
			dispatch({
				type: 'SET_MESSAGE',
				payload: {
					message: `You have ${cardsList.length} unanswered question${cardsList.length > 1 ? 's' : ''}`
				}
			})
		}
	}

	const sidebarButtons = [
		{
			name: "Show All Cards",
			icon: AllCardsIcon,
			action: showAllCards
		},
		{
			name: "Question Only Cards",
			icon: QuestionIcon,
			action: showQuestionOnlyCards
		}
	]

	return (
		<div className="page card-library-page">
			<Header
				title="Card Library"
				cornerIcon={ViewCardsIcon}
			/>
			<Sidebar sidebarButtons={sidebarButtons}/>
			<main className="main card-library-container">
				{isLoading && (
					<>
						<p className="loading-library">Loading Card Library...</p>
						<Loading/>
					</>
				)}
				{!isLoading && visibleCards.length > 0 && visibleCards.map(card => (
					<Card
						key={card.id}
						card={card}
					/>
				))}
			</main>
		</div>
	)
}
