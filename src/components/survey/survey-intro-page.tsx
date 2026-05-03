import Intro1 from "../steps-background/intro1";

interface IntroPageProps {
	onNext: () => void;
}

export function SurveyIntroPage({ onNext }: IntroPageProps) {
	return (
		<div className="min-h-screen">
			<button onClick={onNext} type="submit">
				mockup
			</button>
			<Intro1 />
		</div>
	);
}
