import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
// import { Closing } from "../../../interfaces";
import { SummarySale } from "../../../types/summarySale.type";
import { currencyFormat } from "../../../utils";
import clsx from "clsx";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
// import { Fragment } from "react/jsx-runtime";

interface Props {

  summary: SummarySale | null;

}

export const ClosingSummary = ({ summary }: Props) => {

  return (
    <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">

      <h3 className="sr-only">Elementos Cuentas</h3>

      <ul role="list" className="divide-y divide-gray-200">

        {

          summary?.detail.map((detail) => (
            <Disclosure as="li" key={detail.code}>
              {({ open }) => (
                <>
                  <h3>
                    <DisclosureButton className="group relative flex w-full items-center justify-between py-6 text-left">
                      <span
                        className={clsx(open ? 'text-primary-600' : 'text-primary-900', 'text-sm font-semibold')}
                      >
                        <span className="text-xl p-4">{detail.name}</span>
                        <span className="text-xl p-4">{currencyFormat(detail.total)}</span>
                      </span>
                      <span className="ml-6 flex items-center">
                        {open ? (
                          <MinusIcon
                            className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                            aria-hidden="true"
                          />
                        ) : (
                          <PlusIcon
                            className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel as="div" className="prose prose-sm pb-6">
                    <ul role="list">
                      {detail.detail?.map((subDetail) => (
                        <li key={subDetail.code} className="flex items-center justify-between p-4">
                          <span className="text-sm font-medium text-gray-900">{subDetail.name}</span>
                          <span className="text-sm font-medium text-gray-900">{currencyFormat(subDetail.total)}</span>
                        </li>
                      ))}
                    </ul>
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>
          ))

        }

      </ul>

      <dl className="space-y-6 border-t border-gray-200 px-4 py-6 ">

        <div className="flex items-center justify-between">

          <dt className="text-2xl text-primary font-bold">Total:</dt>

          <dd className="text-xl">{currencyFormat(summary?.total || 0)}</dd>

        </div>

      </dl>

    </div>
  )

}
