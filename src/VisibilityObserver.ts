/**
 * Either a [DOMRect](https://developer.mozilla.org/en-US/docs/Web/API/DOMRect)
 * for the visible box of the target element, or `null` if the element has no
 * visible box.
 */
export type VisibleRect = DOMRect | null

/**
 * The **VisibilityObserverEntry** interface represents the object passed to the
 * `VisibilityObserver` constructor's callback function, which allows you to
 * access the new dimensions of the visible box of the
 * [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) or
 * [SVGElement](https://developer.mozilla.org/en-US/docs/Web/API/SVGElement)
 * being observed.
 */
export interface VisibilityObserverEntry {
	/**
	 * A reference to the
	 * [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) or
	 * [SVGElement](https://developer.mozilla.org/en-US/docs/Web/API/SVGElement)
	 * being observed.
	 */
	readonly target: Element

	/**
	 * Either a [DOMRect](https://developer.mozilla.org/en-US/docs/Web/API/DOMRect)
	 * for the visible box of the target element, or `null` if the element has no
	 * visible box.
	 */
	readonly visibleRect: VisibleRect
}

/**
 * The function called whenever an observed visible box change occurs. The
 * function is called with two parameters:
 *
 * @param entries
 * An array of `VisibilityObserverEntry` objects that can be used to access the
 * new dimensions of the element after each change.
 *
 * @param observer
 * A reference to the `VisibilityObserver` itself, so it will definitely be
 * accessible from inside the callback, should you need it. This could be used
 * for example to automatically unobserve the observer when a certain condition
 * is reached, but you can omit it if you don't need it.
 *
 * The callback will generally follow a pattern along the lines of:
 * @example
 * function(entries, observer) {
 *   for (let entry of entries) {
 *     // Do something to each entry
 *     // and possibly something to the observer itself
 *   }
 * }
 *
 * @example
 * let visibilityObserver = new VisibilityObserver(entries => {
 *   for (let entry of entries) {
 *     if (entry.visibleRect) {
 *       highlightElem.style.display = 'block'
 * 			 highlightElem.style.top = entry.visibleRect.top + 'px'
 * 			 highlightElem.style.left = entry.visibleRect.left + 'px'
 *       highlightElem.style.width = entry.visibleRect.width + 'px'
 *       highlightElem.style.height = entry.visibleRect.height + 'px'
 *     } else {
 *       highlightElem.style.display = 'none'
 *     }
 *   }
 * });
 *
 * visibilityObserver.observe(divElem);
 */
export type VisibilityObserverCallback = (
	entries: VisibilityObserverEntry[],
	observer: VisibilityObserver,
) => void

/**
 * The **VisibilityObserver** interface reports changes to the dimensions of the
 * visible of of an [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element)
 * or [SVGElement](https://developer.mozilla.org/en-US/docs/Web/API/SVGElement).
 *
 * > **Note:** The visible box is the box of the visible area of an element on
 * > screen. Which may be hidden by parent elements not including the window
 * > itself.
 */
export default class VisibilityObserver {
	/**
	 * The **VisibilityObserver** constructor creates a new `VisibilityObserver`
	 * object, which can be used to report changes to the visible box of an
	 * `Element` or `SVGElement`.
	 *
	 * @example
	 * let visibilityObserver = new VisibilityObserver(callback)
	 *
	 * @param callback
	 * The function called whenever an observed visible rect occurs. The function is
	 * called with two parameters:
	 * * **entries**
	 *   An array of `VisibilityObserverEntry` objects that can be used to access
	 *   the new dimensions of the element after each change.
	 * * **observer**
	 *   A reference to the `VisibilityObserver` itself, so it will definitely be
	 *   accessible from inside the callback, should you need it. This could be
	 *   used for example to automatically unobserve the observer when a certain
	 *   condition is reached, but you can omit it if you don't need it.
	 *
	 * The callback will generally follow a pattern along the lines of:
	 * ```js
	 * function(entries, observer) {
	 *   for (let entry of entries) {
	 *     // Do something to each entry
	 *     // and possibly something to the observer itself
	 *   }
	 * }
	 * ```
	 *
	 * @example
	 * let visibilityObserver = new VisibilityObserver(entries => {
	 *   for (let entry of entries) {
	 *     if (entry.visibleRect) {
	 *       highlightElem.style.display = 'block'
	 * 			 highlightElem.style.top = entry.visibleRect.top + 'px'
	 * 			 highlightElem.style.left = entry.visibleRect.left + 'px'
	 *       highlightElem.style.width = entry.visibleRect.width + 'px'
	 *       highlightElem.style.height = entry.visibleRect.height + 'px'
	 *     } else {
	 *       highlightElem.style.display = 'none'
	 *     }
	 *   }
	 * });
	 *
	 * visibilityObserver.observe(divElem);
	 */
	constructor(callback: VisibilityObserverCallback) {
		init(this, callback)
	}

	/**
	 * The `observe()` method of the VisibilityObserver interface starts observing
	 * the specified [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element)
	 * or [SVGElement](https://developer.mozilla.org/en-US/docs/Web/API/SVGElement).
	 *
	 * @example
	 * visibilityObserver.observe(target);
	 *
	 * @param target
	 * A reference to an
	 * [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) or
	 * [SVGElement](https://developer.mozilla.org/en-US/docs/Web/API/SVGElement)
	 * to be observed.
	 */
	observe(target: Element) {
		observe(this, target)
	}

	/**
	 * The **unobserve()** method of the VisibilityObserver interface ends the
	 * observing of a specified [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element)
	 * or [SVGElement](https://developer.mozilla.org/en-US/docs/Web/API/SVGElement).
	 */
	unobserve(target: Element) {
		unobserve(this, target)
	}

	/**
	 * The **disconnect()** method of the VisibilityObserver interface unobserves
	 * all observed [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element)
	 * or [SVGElement](https://developer.mozilla.org/en-US/docs/Web/API/SVGElement)
	 * targets.
	 */
	disconnect() {
		disconnect(this)
	}
}

/**
 * Collects all of an `element`'s parents into an array.
 * Ordered by closest ancestor to furthest.
 * @private
 */
let getAncestorElements = (element: Element): Element[] => {
	let ancestorNodes: Element[] = []
	let parentNode = element.parentNode

	while (parentNode && parentNode !== document) {
		if (parentNode instanceof Element) {
			ancestorNodes.push(parentNode)
		}
		parentNode = parentNode.parentNode
	}

	return ancestorNodes
}

/**
 * Gets the `VisibleRect` of an `element`.
 */
export function getVisibleRect(element: Element): VisibleRect {
	let ancestorElements = getAncestorElements(element)
	let visibleRect = element.getBoundingClientRect()

	for (let index = 0; index < ancestorElements.length; index++) {
		let ancestorElement = ancestorElements[index]
		let computedStyle = window.getComputedStyle(ancestorElement)

		if (computedStyle.display === "none") {
			return null
		}

		if (computedStyle.visibility === "hidden") {
			return null
		}

		if (computedStyle.overflow === "visible") {
			continue
		}

		let parentRect = ancestorElement.getBoundingClientRect()
		let intersection = getRectIntersection(parentRect, visibleRect)

		if (!intersection) {
			return null
		}

		visibleRect = intersection
	}

	return visibleRect
}

/**
 * Checks if two `VisibleRect`'s are equal.
 * @private
 */
let isSameVisibleRect = (a: VisibleRect, b: VisibleRect): boolean => {
	if (a === null && b === null) return true
	if (a === null || b === null) return false
	return (
		a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height
	)
}

/**
 * Get the intersection of two `DOMRect` objects.
 * Returns `null` if there is no intersection.
 * @private
 */
let getRectIntersection = (parent: DOMRect, child: DOMRect): DOMRect | null => {
	// faster checks
	if (child.left >= parent.right) return null
	if (child.top >= parent.bottom) return null
	if (child.right <= parent.left) return null
	if (child.bottom <= parent.top) return null

	let top = Math.max(parent.top, child.top) // ↓
	let left = Math.max(parent.left, child.left) // →
	let right = Math.min(parent.right, child.right) // ←
	let bottom = Math.min(parent.bottom, child.bottom) // ↑

	let width = right - left
	let height = bottom - top

	if (width <= 0 || height <= 0) return null

	// Order: x, y, width, height
	return new DOMRect(left, top, width, height)
}

/**
 * Internal state of observer.
 * Names are for minification.
 * @private
 */
interface InternalState {
	/** The callback of the visibility observer*/
	c: VisibilityObserverCallback
	/** map of target elements to their last measured visible rect */
	t: Map<Element, VisibleRect>
	/** animation frame request */
	r: null | number
}

/**
 * Internal state of all observers
 * @private
 */
let INTERNAL_STATES = new WeakMap<VisibilityObserver, InternalState>()

/**
 * Internal implementation of `VisibilityObserver#unobserve`
 * @private
 */
let init = (
	observer: VisibilityObserver,
	callback: VisibilityObserverCallback,
) => {
	INTERNAL_STATES.set(observer, {
		c: callback,
		t: new Map(),
		r: null,
	})
}

/**
 * Internal implementation of `VisibilityObserver#observe`
 * @private
 */
let observe = (observer: VisibilityObserver, target: Element) => {
	let state = INTERNAL_STATES.get(observer) as InternalState
	state.t.set(target, null)
	if (!state.r) {
		start(observer, state)
	}
}

/**
 * Internal implementation of `VisibilityObserver#unobserve`
 * @private
 */
let unobserve = (observer: VisibilityObserver, target: Element) => {
	let state = INTERNAL_STATES.get(observer) as InternalState
	state.t.delete(target)
	if (!state.t.size) {
		cancel(state)
	}
}

/**
 * Internal implementation of `VisibilityObserver#disconnect`
 * @private
 */
let disconnect = (observer: VisibilityObserver) => {
	let state = INTERNAL_STATES.get(observer) as InternalState
	state.t.clear()
	cancel(state)
}

/**
 * Internal helper to start animation frame requests that call the callback
 * with updates to visible rects.
 * @private
 */
let start = (observer: VisibilityObserver, state: InternalState) => {
	function request() {
		/**
		 * TODO: This entire thing should be refactored to use ResizeObserver,
		 * MutationObserver, scroll events on the element and window.
		 */
		state.r = requestAnimationFrame(() => {
			let entries: VisibilityObserverEntry[] = []

			state.t.forEach((prevVisibleRect, target) => {
				let visibleRect = getVisibleRect(target)

				if (!isSameVisibleRect(prevVisibleRect, visibleRect)) {
					state.t.set(target, visibleRect)
					entries.push({
						target,
						visibleRect,
					})
				}
			})

			state.c(entries, observer)
			request()
		})
	}
	request()
}

/**
 * Internal helper to cancel animation frame requests
 * @private
 */
let cancel = (state: InternalState) => {
	if (state.r) {
		cancelAnimationFrame(state.r)
		state.r = null
	}
}
