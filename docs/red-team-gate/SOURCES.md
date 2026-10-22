# Sources and limits

## Where the method comes from

The skill combines established methods from philosophy of science, decision research, and security practice. It does not introduce a new theory. Each method card in `skills/red-team-gate/references/methods.md` names its source.

| Method | Reference |
|---|---|
| Steelmanning (Step 1) | The principle of charity in interpretation, associated with Neil Wilson and Donald Davidson. "Steelmanning" is an informal recent term, the counterpart of the straw-man fallacy. |
| Severe testing | Deborah G. Mayo, *Error and the Growth of Experimental Knowledge*, University of Chicago Press, 1996. Deborah G. Mayo, *Statistical Inference as Severe Testing: How to Get Beyond the Statistics Wars*, Cambridge University Press, 2018. |
| Bayesian disconfirmation | Rudolf Carnap, *Logical Foundations of Probability*, University of Chicago Press, 1950 (2nd ed. 1962). Carl G. Hempel, "Studies in the Logic of Confirmation (I and II)", *Mind* 54 (1945): 1–26 and 97–121. |
| Falsifiability; falsifier demand | Karl Popper, *Logik der Forschung*, 1934 (English: *The Logic of Scientific Discovery*, 1959). Karl Popper, *Conjectures and Refutations*, 1963 (a US edition is dated 1962). |
| Research-programme test | Imre Lakatos, "Falsification and the Methodology of Scientific Research Programmes", in Imre Lakatos and Alan Musgrave (eds.), *Criticism and the Growth of Knowledge*, Cambridge University Press, 1970, pp. 91–196. Use-novelty: Elie Zahar, "Why did Einstein's Programme supersede Lorentz's? (I)", *British Journal for the Philosophy of Science* 24, no. 2 (1973): 95–123, doi:10.1093/bjps/24.2.95; later adopted by Lakatos. |
| Scope-breaking | Thomas S. Kuhn, *The Structure of Scientific Revolutions*, University of Chicago Press, 1962. |
| Dialectic | Gregory Vlastos, "The Socratic Elenchus", *Oxford Studies in Ancient Philosophy* 1 (1983): 27–58. |
| Pre-mortem | Gary Klein, "Performing a Project Premortem", *Harvard Business Review* 85, no. 9 (September 2007): 18–19. Deborah J. Mitchell, J. Edward Russo and Nancy Pennington, "Back to the Future: Temporal Perspective in the Explanation of Events", *Journal of Behavioral Decision Making* 2, no. 1 (1989): 25–38, doi:10.1002/bdm.3960020103. Daniel Kahneman, *Thinking, Fast and Slow*, Farrar, Straus and Giroux, 2011, ch. 24. |
| Devil's advocate | The Catholic Church's office of the Promoter of the Faith in canonization. Irving L. Janis, *Victims of Groupthink*, Houghton Mifflin, 1972. |
| Adversarial collaboration | Gary P. Latham, Miriam Erez and Edwin A. Locke, "Resolving Scientific Disputes by the Joint Design of Crucial Experiments by the Antagonists", *Journal of Applied Psychology* 73, no. 4 (1988): 753–772. Barbara Mellers, Ralph Hertwig and Daniel Kahneman, "Do Frequency Representations Eliminate Conjunction Effects? An Exercise in Adversarial Collaboration", *Psychological Science* 12, no. 4 (2001): 269–275, doi:10.1111/1467-9280.00350. |
| Red teaming | Herbert Goldhamer and Hans Speier, "Some Observations on Political Gaming", *World Politics* 12, no. 1 (1959): 71–83. Micah Zenko, *Red Team: How to Succeed by Thinking Like the Enemy*, Basic Books, 2015. |

## How the references were checked

The core references (severe testing, research programmes, pre-mortem, and the cross-cutting methods) were checked during the skill's private development by a two-model research pass: one model searched broadly, a second model checked the results against primary sources. That pass caught one invented reference and corrected several details before anything was used. In October 2026 the article records for Mitchell, Russo and Pennington (1989), Mellers, Hertwig and Kahneman (2001) and Zahar (1973) were checked against the publishers' and Crossref records. Not every page number or quotation location was checked against the original text. The items below are open:

- Use-novelty: the Zahar (1973) article is confirmed as a publication, but the passage defining use-novelty, and the place where Lakatos adopts it, have not been checked in the original text.
- Popper, *Conjectures and Refutations*: cited as a work, without page references; the edition used for any page reference is not fixed yet.
- The "30%" figure linked to the pre-mortem: deliberately not repeated as a fact (see the Pre-mortem card). The 1989 abstract distinguishes outcome certainty from temporal perspective; the full text has not been re-checked for the figure.

## Corrections built into the cards

- **Pre-mortem.** The popular claim that imagining a future failure improves reason-finding by 30% is repeated from Klein (2007), who attributes it to Mitchell, Russo and Pennington (1989). That study points to certainty about the outcome, not the time shift, as the driver, and the figure was not located verbatim in its accessible text.
- **Dialectic.** The "thesis, antithesis, synthesis" formula is commonly misattributed to Hegel. The cards describe the method instead.
- **Research programmes.** "Degenerating" is defined by the absence of confirmed new predictions, not by the absorption of known anomalies.

## Third-party material

- The text of this skill is original writing. It describes and cites the methods above; it does not reproduce passages from the cited works.
- No third-party code, data, or images are included.
- The practice claims are synthetic. Claims P1, P2 and P5 refer to public technical facts (an RFC, a TLS specification, Python release history) only to test the method.

## Known limits

- Two small tests (a trial of the private predecessor and an acceptance run on one host); see `VALIDATION.md`.
- The skill depends on the agent following written instructions. It has no code that enforces independence, method use, or verdict rules.
- A reviewer's attack is limited by the evidence it can reach. Paywalled, offline, or non-English sources may be missed.
- The verdict is not a measure of truth. It records whether a stated attack, using a stated method, succeeded.
