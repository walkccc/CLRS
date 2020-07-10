## A.2-1

> Show that $\sum_{k = 1}^n 1/k^2$ is bounded above by a constant.

We proceed by induction on $n$. If $n = 1$, then the sum is bounded above by $c$
for any $c\geq 1$. Now suppose $\sum_{k = 1}^{n} 1/k^2 \leq c$ where $c$ is a
constant for $n > 1$. Consider

$$
\begin{aligned}
\sum_{k = 1}^{n+1} \frac{1}{k^2} &= \sum_{k = 1}^{n} \frac{}{k^2} + \frac{1}{n +
1}\\\\
&\leq c + \frac{1}{n + 1} &&\text{by the inductive hypothesis}\\\\
&\leq c + \frac{1}{2}
\end{aligned}
$$

since $n > 1$. Therefore, $\sum_{k = 1}^{n} 1/k^2$ is bounded above by a
constant.
## A.2-2

> Find an asymptotic upper bound on the summation $$ \sum_{k = 0}^{\lfloor \lg
> n\rfloor}\lceil n/2^k\rceil. $$

(Omit!)

## A.2-3

> Show that the $n$th harmonic number is $\Omega(\lg n)$ by splitting the
> summation.

(Omit!)

## A.2-4

> Approximate $\sum_{k = 1}^n k^3$ with an integral.

(Omit!)

## A.2-5

> Why didn't we use the integral approximation (A.12) directly on $\sum_{k =
> 1}^n 1/k$ to obtain an upper bound on the $n$th harmonic number?

(Omit!)
