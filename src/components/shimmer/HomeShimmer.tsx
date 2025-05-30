
const HomeShimmer: React.FC = () => {

	return (
		<div className="flex flex-wrap gap-8 w-3/5 justify-center mx-auto">
			{Array(10)
				.fill("")
				.map(() => (
					<div className="flex flex-col rounded shadow-md sm:w-80 animate-pulse w-[300px]">
						<div className="rounded-t bg-gray-400 h-[200px] "></div>
						<div className="flex-1 px-4 py-8 space-y-4 sm:p-8 bg-gray-50">
							<div className="w-full h-6 rounded bg-gray-400"></div>
							<div className="w-full h-4 rounded bg-gray-400"></div>
							<div className="w-full h-4 rounded bg-gray-400"></div>
						</div>
					</div>
				))}
		</div>
	);
};

export default HomeShimmer;
