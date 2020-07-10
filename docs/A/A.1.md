## A.1-1

> Find a simple formula for $\sum_{k = 1}^n (2k - 1)$.

Note first that $\sum_{k = 1}^n 1 = n$. Then by the linearity property of
summations,
$$
\begin{aligned}
\sum_{k = 1}^n (2k + 1) &= 2\sum_{k = 1}^n k - \sum_{k = 1}^n 1 \\\\
&= 2\cdot\frac{1}{2}n(n + 1) - n &&\text{by (A.1)} \\\\
&= n^2.
\end{aligned}
$$
## A.1-2

> Show that $\sum_{k = 1}^n 1/(2k - 1) = \ln(\sqrt{n}) + O(1)$ by manipulating
> the harmonic series.

First, note that
$$\sum_{k = 1}^{2n}\frac{1}{k} = \sum_{\\{k\in[2n] : k\text{ is
odd}\\}}\frac{1}{k} + \sum_{\\{k\in[2n] : k\text{ is
even}\\}}\frac{1}{k},$$

where $[m] := \\{1,2,\ldots,m \\}$ for $m\in \mathbb{N}$. The two sums on the
right can be more easily computed as
$$
\begin{aligned}
\sum_{\\{k\in[2n] : k\text{ is odd}\\}}\frac{1}{k} &= \sum_{k = 1}^n \frac{1}{2k
- 1} &&\text{ and}\\\\
\sum_{\\{k\in[2n] : k\text{ is
even}\\}}\frac{1}{k} &= \sum_{k = 1}^n \frac{1}{2k}.
\end{aligned}
$$

Hence,
$$
\begin{aligned}
\sum_{k = 1}^n \frac{1}{2k- 1} &= \sum_{k = 1}^{2n}\frac{1}{k} - \sum_{k =
1}^{n} \frac{1}{2k}\\\\
&= \ln(2n) + O(1) - \frac{1}{2}\sum_{k = 1}^n\frac{1}{k} &&\text{ by }\\\\
&= \ln n + \ln 2 + O(1) - \frac{1}{2}\ln n\\\\
&= \frac{1}{2}\ln n + O(1)\\\\
&= \ln(\sqrt{n}) + O(1).
\end{aligned}
$$

## A.1-3

> Show that $\sum_{k = 0}^\infty k^2 x^k = x(1 + x)/(1 - x)^3$ for $0 < |x| <
> 1$.

Note that $\sum_{k = 0}^{\infty} x^k = \frac{1}{1 - x}$ for $0 < |x| < 1$ by
(A.5). Differentiating both sides of this gives,

$$
\begin{aligned}
    \sum_{k = 0}^{\infty} kx^{k - 1} = \frac{1}{(1 - x)^2}
\end{aligned}
$$

We then multiply both sides by $x$ to obtain $\sum_{k = 0}^{\infty} kx^k =
x/(1 - x)^2$. Differentiating again we obtain

$$
\begin{aligned}
\sum_{k=0}^{\infty} k^2 x^{k - 1} &= \frac{(1 - x)^2 + 2x(1 - x)}{(1 - x)^4}\\\\
&= \frac{1 + x}{(1 - x)^3}.
\end{aligned}
$$

Multiplying both sides of the above equation by $x$ gives the desired result.

## A.1-4

> Show that $\sum_{k = 0}^\infty (k - 1)/2^k = 0$.

(Omit!)

## A.1-5

> Evaluate the sum $\sum_{k = 1}^\infty (2k+1)x^{2k}$.

(Omit!)

## A.1-6

> Prove that $\sum_{k = 1}^n O(f_k(i)) = O\left( \sum_{k = 1}^n f_k(i) \right)$
> by using the linearity property of summations.

(Omit!)

## A.1-7

> Evaluate the product $\prod_{k = 1}^n 2\cdot 4^k$.

Define $P_n := \prod_{k = 1}^n 2\cdot 4^k$. Then note that

$$
\begin{aligned}
\lg P_n &= \sum_{k = 1}^n\lg (2\cdot 4^k)\\\\
    &= \sum_{k = 1}^n \lg(2\cdot 2^{2k}) \\\\
    &= \sum_{k = 1}^n \lg(2^{2k + 1}) \\\\
    &= \sum_{k = 1}^n (2k + 1) \\\\
    &= n^2 + 2n
\end{aligned}
$$
using the linearity property of summations and equation (A.1) from the text.
Therefore, $P_n = 2^{n^2 + 2n}$.


## A.1-8

> Evaluate the product $\prod_{k = 2}^n (1 - 1/k^2)$.

Define $P_n := \prod_{k = 2}^{n} (1 - 1/k^2)$. Then

$$
\begin{aligned}
P_n = \prod_{k = 2}^n \left( 1 - \frac{1}{k^2} \right) &= \prod_{k = 2}^{n}
\frac{k^2 - 1}{k^2}\\\\
&= \prod_{k = 2}^{n} \frac{(k - 1)(k + 1)}{k\cdot k}\\\\
&= \frac{1\cdot \cancel{3}}{2\cdot \cancel{2}}\cdot\frac{\cancel{2}\cdot
\cancel{4}}{\cancel{3}\cdot \cancel{3}}\cdot\frac{\cancel{3}\cdot
\cancel{5}}{\cancel{4}\cdot \cancel{4}}\cdots\frac{\cancel{(n - 1)}(n +
1)}{\cancel{n}\cdot n}\\\\
&= \frac{1}{2}\cdot\frac{n + 1}{n}
\end{aligned}
$$

Therefore, $P_n = \frac{1}{2}(1 + \frac{1}{n})$.
