import React, { useState, useEffect } from 'react'
import _ from 'lodash'

import './App.scss'
import AppBackground from './components/app-background'

export default function App () {
	const [windowHeight, setWindowHeight] = useState(window.innerHeight)
	const [windowWidth, setWindowWidth] = useState(window.innerWidth)
	const [windowRatio, setWindowRatio] = useState(window.innerWidth / window.innerHeight)
	const [paperHeight, setPaperHeight] = useState(window.innerHeight)
	const [paperWidth, setPaperWidth] = useState(window.innerWidth)
	const [lineCount, setLineCount] = useState(33)
	const [lines, setLines] = useState([])

	const defaultPaperRatio = 0.7727

	const updateWindowSize = () => {
		setWindowHeight(window.innerHeight)
		setWindowWidth(window.innerWidth)
		setWindowRatio(window.innerWidth/window.innerHeight)
	}

	function updatePaperSize () {
		if (windowRatio > defaultPaperRatio) {
			setPaperHeight(windowWidth * 1.294117647058824)
			setPaperWidth(windowWidth)
		} else if (windowRatio > defaultPaperRatio) {
			setPaperHeight(windowWidth)
			setPaperWidth(windowWidth)
		}
	}

	function updateLineCount () {
		if (windowRatio > defaultPaperRatio) {
			setLineCount(Math.round(33/windowRatio))
		}
	}

	useEffect(() => {
		window.addEventListener("resize", updateWindowSize)
		return () => window.removeEventListener("resize", updateWindowSize)
	})

	useEffect(() => {
		updatePaperSize()
		updateLineCount()
		return () => {
			setPaperHeight(windowHeight)
			setPaperWidth(windowWidth)
			setLineCount(33)
		}
	}, [windowRatio])

	useEffect(() => {
		const newLines = []
		_.times(lineCount, (i) => {
			newLines.push(<div className='blue-line' key={`blue-line-${i+1}`} />)
		})
		setLines(newLines)
	}, [lineCount])

	return (
		<AppBackground>
			<div className='app-grid'>
				<header className='app-header'>This is a header</header>
				<main className='app-main'>This is the main</main>
			</div>
		</AppBackground>
	)
}