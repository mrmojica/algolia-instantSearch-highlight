import React from 'react';
import { InstantSearch, Configure, Highlight } from 'react-instantsearch/dom';
import { connectAutoComplete } from 'react-instantsearch/connectors';
import Autosuggest from 'react-autosuggest';
import 'react-instantsearch-theme-algolia/style.scss';

/* Getting the following warning message in the console:

Warning: setState(...): Can only update a mounted or mounting component. 
This usually means you called setState() on an unmounted component. 
This is a no-op. Please check the code for the AlgoliaHighlighter(Highlight) component. 

*/

const Search = () =>
	<InstantSearch appId="latency" apiKey="6be0576ff61c053d5f9a3225e2a90f76" indexName="bestbuy">
		<AutoComplete />
		<Configure hitsPerPage={5} />
	</InstantSearch>;

const AutoComplete = connectAutoComplete(({ hits, currentRefinement, refine }) => {
	return (
		<Autosuggest
			suggestions={hits}
			multiSection={false}
			onSuggestionsFetchRequested={({ value }) => refine(value)}
			onSuggestionsClearRequested={() => refine('')}
			getSuggestionValue={hit => hit.name}
			renderSuggestion={hit => <Suggestion hit={hit} />}
			inputProps={{
				placeholder: 'Type a product',
				value: currentRefinement,
				onChange: () => {}
			}}
			renderSectionTitle={section => section.index}
			getSectionSuggestions={section => section.hits}
		/>
	);
});

const Suggestion = ({ hit }) => {
	if (hit.salePrice > 20) {
		return (
			<div className="hwd-Suggestion">
				<PriceOver hit={hit} />
			</div>
		);
	} else {
		return (
			<div className="hwd-Suggestion">
				<PriceUnder hit={hit} />
			</div>
		);
	}
};

const PriceOver = ({ hit }) =>
	<div>
		<p> over 20</p>
		<PrimarySuggestionText hit={hit} />
	</div>;

const PriceUnder = ({ hit }) =>
	<div>
		<p> under 20 </p>
		<PrimarySuggestionText hit={hit} />
	</div>;

const PrimarySuggestionText = ({ hit }) =>
	<span>
		<Highlight attributeName="name" hit={hit} />
	</span>;

export default Search;
